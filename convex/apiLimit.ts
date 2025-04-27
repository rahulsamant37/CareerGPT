import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { FREE_TIER_CREDITS } from "@/lib/api-limits";

export const getUserCredits = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const apiLimits = await ctx.db
        .query("apiLimits")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .unique();

      if (!apiLimits) {
        return {
          credits: FREE_TIER_CREDITS,
        };
      }

      return {
        credits: apiLimits?.credits,
      };
    } catch (error) {
      return {
        credits: 0,
      };
    }
  },
});

export const deductCredit = mutation({
  args: { userId: v.string(), credit: v.number() },
  handler: async (ctx, args) => {
    const apiLimits = await ctx.db
      .query("apiLimits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!apiLimits || apiLimits?.credits < args.credit) {
      throw new ConvexError({
        type: "INSUFFICIENT_CREDITS",
        message: "You have run out of credits",
        required: args.credit,
        available: apiLimits?.credits ?? 0,
      });
    }

    const newCredits = parseFloat((apiLimits.credits - args.credit).toFixed(2));
    await ctx.db.patch(apiLimits._id, {
      credits: newCredits,
      updatedAt: Date.now(),
    });
  },
});

export const addCredits = mutation({
  args: {
    userId: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    const userLimits = await ctx.db
      .query("apiLimits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .unique();

    if (!userLimits) throw new ConvexError("User not found");

    const newCredits = parseFloat(
      (userLimits.credits + args.credits).toFixed(2)
    );

    await ctx.db.patch(userLimits._id, {
      credits: newCredits,
    });
  },
});
