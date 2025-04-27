import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { PaymentStatus } from "@/lib/constants";
import { Id } from "./_generated/dataModel";

export const createPayment = mutation({
  args: {
    orderId: v.optional(v.string()), // PayPal order ID
    transactionId: v.optional(v.string()), // PayPal transaction ID
    credits: v.number(),
    userId: v.string(), // User ID
    amount: v.number(), // Amount in USD
    status: v.union(
      v.literal(PaymentStatus.PENDING),
      v.literal(PaymentStatus.COMPLETED),
      v.literal(PaymentStatus.FAILED)
    ),
  },
  handler: async (ctx, args) => {
    const paymentId = await ctx.db.insert("payments", {
      paypalOrderId: args.orderId,
      transactionId: args.transactionId,
      userId: args.userId,
      amount: args.amount,
      credits: args.credits,
      status: args.status,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return paymentId;
  },
});

export const updatePayment = mutation({
  args: {
    paymentId: v.string(),
    status: v.union(
      v.literal(PaymentStatus.PENDING),
      v.literal(PaymentStatus.COMPLETED),
      v.literal(PaymentStatus.FAILED)
    ),
    transactionId: v.optional(v.string()),
    paypalOrderId: v.optional(v.string()),
  },
  handler: async (ctx, { paymentId, status, transactionId, paypalOrderId }) => {
    if (!paymentId) {
      throw new ConvexError("Payment Id missing");
    }
    await ctx.db.patch(paymentId as Id<"payments">, {
      status,
      transactionId,
      paypalOrderId,
      updatedAt: Date.now(),
    });
  },
});
