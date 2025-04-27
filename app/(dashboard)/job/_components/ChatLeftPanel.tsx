"use client";
import ChatComponent from "@/components/ChatComponent";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { MessageSquareText, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { DeleteConversationButton } from "@/components/DeleteConversationButton";

const ChatLeftPanel = (props: { jobId: string }) => {
  const { jobId } = props;
  const { user } = useUser();
  const { open, isMobile } = useSidebar();

  const userId = user?.id || null;
  const userName = user?.firstName || null;

  return (
    <div className="w-full h-screen flex flex-col">
      <div
        className="h-12 w-full border-b
        border-gray-200 dark:border-gray-800 flex items-center justify-between px-4
        bg-white dark:bg-gray-900 shadow-sm
        "
      >
        <div className="flex items-center gap-3">
          {(!open || isMobile) && <SidebarTrigger className="bg-background/80 backdrop-blur-sm shadow-sm" />}
          <div className="flex items-center gap-2">
            <MessageSquareText className="h-5 w-5 text-primary" />
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">Job Insight Assistant</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800 py-2 px-4 bg-gray-50 dark:bg-gray-900/50 flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ask questions about the job description, requirements, or how to prepare
        </p>

        {userId && (
          <DeleteConversationButton jobId={jobId} userId={userId} />
        )}
      </div>

      <div className="flex-1 overflow-hidden p-2">
        <ChatComponent
          {...{
            jobId,
            userId,
            userName,
          }}
        />
      </div>
    </div>
  );
};

export default ChatLeftPanel;
