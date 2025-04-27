"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyPayment = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const capturePaypalOrder = useAction(api.paymentAction.capturePayPalOrder);

  useEffect(() => {
    if (token && user?.id) {
      (async () => {
        try {
          const response = await capturePaypalOrder({
            orderID: token,
            userId: user.id,
          });
          console.log(response, "response");
          setStatus("success");
        } catch (error) {
          console.log(error, "error");
          setStatus("error");
          const errorMsg =
            error instanceof ConvexError
              ? error.data
              : "Failed to verify payment";

          toast.error(errorMsg);
        }
      })();
    }
  }, [token, user?.id, capturePaypalOrder]);

  const { icon, title, description } = {
    loading: {
      icon: <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" />,
      title: "Verifying payment...",
      description: "Please wait while we process your payment.",
    },
    success: {
      icon: <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />,
      title: "Payment Successful!",
      description: "Your payment has been processed successfully.",
    },
    error: {
      icon: <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />,
      title: "Payment Failed",
      description:
        "There was an issue processing your payment. Please try again.",
    },
  }[status];

  return (
    <div
      className="flex flex-col items-center justify-center
     h-screen p-4"
    >
      <div className="p-8 text-center max-w-md w-full">
        {/* //icon */}
        {icon}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2">
          {/* //description */}
          {description}
        </p>
      </div>
    </div>
  );
};

export default VerifyPayment;
