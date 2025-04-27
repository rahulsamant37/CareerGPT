"use node";
import axios from "axios";
import { action } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import { PaymentStatus } from "@/lib/constants";
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const PAYPAL_API_BASE_URL = process.env.PAYPAL_API_BASE_URL!;

// Helper to get paypal access token

const getAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  const response = await axios.post(
    `${PAYPAL_API_BASE_URL}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
    }
  );
  return response.data.access_token;
};

export const createPaypalOrder = action({
  args: {
    userId: v.string(),
    amount: v.number(),
    credits: v.number(),
    redirectUrl: v.string(),
  },
  handler: async (
    ctx,
    { amount, credits, redirectUrl, userId }
  ): Promise<string> => {
    try {
      const accessToken = await getAccessToken();
      const paymentId = await ctx.runMutation(api.payment.createPayment, {
        userId,
        amount: amount,
        credits: credits,
        status: PaymentStatus.PENDING,
      });
      //call the createPaypalOrder api
      const response = await axios.post(
        `${PAYPAL_API_BASE_URL}/v2/checkout/orders`,
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: amount.toFixed(2),
              },
              custom_id: `${paymentId.toString()}:${credits}`,
            },
          ],
          application_context: {
            return_url: redirectUrl,
            cancel_url: redirectUrl,
            landing_page: "BILLING",
            user_action: "PAY_NOW",
            shipping_preference: "NO_SHIPPING",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const approvalLink = response.data.links.find(
        (link: any) => link.rel === "approve"
      );
      if (!approvalLink) {
        throw new ConvexError("No approval link found in Paypal");
      }
      return approvalLink.href;
    } catch (error) {
      throw new ConvexError("Failed to create order");
    }
  },
});

export const capturePayPalOrder = action({
  args: {
    orderID: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, { orderID, userId }) => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        `${PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const capture =
        response.data?.purchase_units?.[0]?.payments?.captures?.[0];
      if (!capture) throw new ConvexError("Capture data not found");

      const customId = capture.custom_id;
      const [paymentId, credits] = customId.split(":");

      if (capture.status === "DECLINED" || capture.status === "FAILED") {
        if (paymentId) {
          await ctx.runMutation(api.payment.updatePayment, {
            paymentId,
            paypalOrderId: orderID,
            status: PaymentStatus.FAILED,
          });
        }
        throw new ConvexError("Payment verification failed");
      }

      const transactionId = capture.id;

      await ctx.runMutation(api.payment.updatePayment, {
        paymentId,
        paypalOrderId: orderID,
        transactionId,
        status: PaymentStatus.COMPLETED,
      });

      //add new credit
      await ctx.runMutation(api.apiLimit.addCredits, {
        userId,
        credits: parseInt(credits),
      });

      return response.data;
    } catch (error) {
      //paymentId
      console.log(error, "error");
      throw new ConvexError("Payment failed");
    }
  },
});
