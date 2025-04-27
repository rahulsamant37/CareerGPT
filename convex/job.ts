import { CREDIT_COST, FREE_TIER_CREDITS } from "@/lib/api-limits";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { JobStatus } from "@/lib/constants";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const createJob = mutation({
  args: {
    userId: v.string(),
    jobDescription: v.string(),
  },
  handler: async (ctx, args) => {
    let apiLimits = await ctx.db
      .query("apiLimits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!apiLimits) {
      const newLimitsId = await ctx.db.insert("apiLimits", {
        userId: args.userId,
        credits: FREE_TIER_CREDITS,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      apiLimits = await ctx.db.get(newLimitsId);
    }

    if (!apiLimits) {
      throw new ConvexError("Failed to initialize your account");
    }

    if (apiLimits.credits < CREDIT_COST.JOB_CREATION) {
      return {
        data: null,
        message: "You have run out of credits. Buy more to continue.",
        requiresUpgrade: true,
      };
    }

    const jobId = await ctx.db.insert("jobs", {
      userId: args.userId,
      jobTitle: "Untitled",
      originalDescription: args.jobDescription,
      processedDescription: "",
      htmlFormatDescription: "",
      status: JobStatus.PROCESSING,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Deduct credit after successful job creation
    await ctx.runMutation(api.apiLimit.deductCredit, {
      userId: args.userId,
      credit: CREDIT_COST.JOB_CREATION,
    });

    // AI processing
    await ctx.scheduler.runAfter(0, internal.action.processJobWithAI, {
      jobId: jobId,
      userId: args.userId,
      jobDescription: args.jobDescription,
    });

    return { data: jobId, success: true };
  },
});

export const updateJob = mutation({
  args: {
    jobId: v.id("jobs"),
    jobTitle: v.optional(v.string()),
    processedDescription: v.optional(v.string()),
    htmlFormatDescription: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal(JobStatus.PROCESSING),
        v.literal(JobStatus.READY),
        v.literal(JobStatus.FAILED)
      )
    ),
  },
  handler: async (ctx, args) => {
    const { jobId, ...rest } = args;
    await ctx.db.patch(jobId, {
      ...rest,
      updatedAt: Date.now(),
    });
  },
});

export const getAllJobs = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("jobs")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getJob = query({
  args: {
    jobId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const jobId = args.jobId as Id<"jobs">;
      return await ctx.db.get(jobId);
    } catch (error) {
      return null;
    }
  },
});
