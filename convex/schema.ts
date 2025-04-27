import {
  JobInsightStatus,
  JobStatus,
  PaymentStatus,
  Role,
} from "@/lib/constants";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  jobs: defineTable({
    userId: v.string(),
    originalDescription: v.string(),
    jobTitle: v.optional(v.string()),
    processedDescription: v.optional(v.string()),
    htmlFormatDescription: v.optional(v.string()),
    status: v.union(
      v.literal(JobStatus.PROCESSING),
      v.literal(JobStatus.READY),
      v.literal(JobStatus.FAILED)
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  jobInsightConversations: defineTable({
    userId: v.string(),
    jobId: v.id("jobs"),
    text: v.string(),
    role: v.union(v.literal(Role.USER), v.literal(Role.AI)),
    status: v.union(
      v.literal(JobInsightStatus.PENDING),
      v.literal(JobInsightStatus.COMPLETED),
      v.literal(JobInsightStatus.FAILED)
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_job", ["jobId"])
    .index("by_user", ["userId"]),

  apiLimits: defineTable({
    userId: v.string(),
    credits: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  payments: defineTable({
    userId: v.string(),
    paypalOrderId: v.optional(v.string()),
    transactionId: v.optional(v.string()),
    amount: v.number(),
    credits: v.number(),
    status: v.union(
      v.literal(PaymentStatus.PENDING),
      v.literal(PaymentStatus.COMPLETED),
      v.literal(PaymentStatus.FAILED)
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
});
