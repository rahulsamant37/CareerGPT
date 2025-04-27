"use client";
import React, { useRef, useState } from "react";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Loader, SendIcon, BriefcaseIcon, InfoIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSignInModal } from "@/hooks/use-signin-modal";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

const JobInfoForm = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { open: openSignInModal } = useSignInModal();
  const { openModal } = useUpgradeModal();

  const [jobDescription, setJobDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef<AutosizeTextAreaRef>(null);

  const createJob = useMutation(api.job.createJob);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isSignedIn || !user) {
      openSignInModal();
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createJob({
        userId: user.id,
        jobDescription: jobDescription,
      });
      if (!response.data && response.requiresUpgrade) {
        // uggradModal hook
        openModal();
        return;
      }
      router.push(`job/${response.data}`);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError && error.data?.message
          ? error.data.message
          : "Failed to create Job";
      toast.error(errorMessage);
    }
  };
  return (
    <div
      className="pt-3 mb-3 z-10 mx-auto
      w-full max-w-2xl
      "
    >
      <div
        className="flex flex-col border-[0.5px]
          border-zinc-300 dark:border-zinc-700 mx-2 md:mx-0 items-stretch
          transition-all duration-200
          relative shadow-lg
          rounded-2xl bg-white dark:bg-gray-900
          "
      >
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <BriefcaseIcon className="w-5 h-5 text-primary" />
          <h3 className="font-medium text-gray-700 dark:text-gray-200">New Job Analysis</h3>
        </div>

        <div className="flex flex-col gap-3.5 px-4 pb-2">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
            <InfoIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p>Paste a job description to get AI-powered insights, interview tips, and personalized advice.</p>
          </div>

          <AutosizeTextarea
            ref={textareaRef}
            rows={3}
            maxHeight={180}
            minHeight={100}
            value={jobDescription}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            placeholder="Paste job title & description here..."
            className="resize-none pr-12 text-base border border-gray-200 dark:border-gray-700
                      font-normal shadow-sm rounded-lg
                      focus-visible:ring-primary
                      dark:bg-gray-800 dark:text-gray-100
                      "
          />
        </div>
        <div
          className="flex w-full items-center
              justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800
              "
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {jobDescription.length > 0 ? `${jobDescription.length} characters` : "Enter job details to continue"}
          </p>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !jobDescription?.trim()}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Analyze Job</span>
                <SendIcon className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobInfoForm;
