"use client";
import React, { useRef, useState } from "react";
import { AutosizeTextarea, AutosizeTextAreaRef } from "../ui/autosize-textarea";
import { Button } from "../ui/button";
import { Lightbulb, Loader, SendIcon } from "lucide-react";
import JobInsightSuggest from "./JobInsightSuggest";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

interface PropType {
  jobId: string;
  userId: string | null;
  isDisabled: boolean;
}
const ChatInput = ({ jobId, isDisabled, userId }: PropType) => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { openModal } = useUpgradeModal();

  const textAreaRef = useRef<AutosizeTextAreaRef>(null);

  const sendMessage = useMutation(api.jobInsightConversation.sendUserMessage);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (input: string) => {
    if (!input.trim() || isDisabled || !userId) return;
    setIsLoading(true);
    try {
      await sendMessage({
        jobId,
        userId,
        message: input,
      });
      setInput("");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError && error?.data?.message
          ? error?.data?.message
          : "Failed to send message";

      if (
        error instanceof ConvexError &&
        error?.data?.type === "INSUFFICIENT_CREDITS"
      ) {
        //Open Buy Credit dialog
        openModal();
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-background border-t border-gray-100 dark:border-gray-800">
      <div
        className="flex flex-row gap-3 mx-2 md:mx-4
        md:last:mb-6 py-3 lg:mx-auto lg:max-w-2xl xl:max-w-3xl
        "
      >
        <div
          className="relative flex flex-col h-full
              flex-1 px-4 mb-0 lg:-mb-3 w-full
              "
        >
          {/* {Suggested prompt} */}
          <JobInsightSuggest
            isDisabled={isLoading || isDisabled}
            setInput={setInput}
            onSubmit={handleSubmit}
          />

          <div
            className="
            relative flex flex-col w-full border-gray-200 dark:border-gray-700
            border shadow-sm
            rounded-2xl p-3 bg-gray-50 dark:bg-gray-800/50
            "
          >
            <AutosizeTextarea
              ref={textAreaRef}
              rows={3}
              minHeight={20}
              maxHeight={200}
              onChange={handleChange}
              value={input}
              disabled={isDisabled || isLoading}
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(input);
                  textAreaRef.current?.textArea.focus();
                }
              }}
              placeholder="Ask about the job..."
              className="resize-none pr-12 !text-[15px]
              border-0 !bg-transparent
              !shadow-none !ring-0
              focus-visible:!ring-offset-0
              focus-visible:!ring-0
              dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />

            <div
              className="flex w-full items-center
              justify-between pt-3"
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full font-normal
                  !text-[13px] !bg-primary/10
                  !text-primary !border-primary/30
                  hover:!bg-primary/20 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Job Insights</span>
                </Button>
              </div>

              <Button
                disabled={!input.trim() || isLoading || isDisabled}
                size="icon"
                className="right-[8px] !bg-primary
                disabled:pointer-events-none !text-white
                disabled:!bg-gray-500/50
                hover:!bg-primary/90 transition-colors"
                onClick={() => {
                  handleSubmit(input);
                  textAreaRef.current?.textArea.focus();
                }}
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <SendIcon className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
