import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Delete all messages for a specific job
export const deleteAllMessagesForJob = mutation({
  args: {
    jobId: v.id("jobs"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Find all messages for this job
    const messages = await ctx.db
      .query("jobInsightConversations")
      .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
      .collect();

    // Verify user owns these messages
    const job = await ctx.db.get(args.jobId);
    if (!job || job.userId !== args.userId) {
      throw new Error("Unauthorized: You don't have permission to delete these messages");
    }

    // Delete all messages
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    return {
      success: true,
      deletedCount: messages.length,
    };
  },
});
