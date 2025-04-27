"use client";
import ChatComponent from "@/components/ChatComponent";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { MessageSquareText } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import React from "react";

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
        border-gray-200 dark:border-gray-800 flex items-center px-4
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
