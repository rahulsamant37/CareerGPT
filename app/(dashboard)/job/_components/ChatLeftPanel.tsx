"use client";
import ChatComponent from "@/components/ChatComponent";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
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
        className="h-10 w-full border-b
      border-gray-200 pt-1 flex items-center px-2
      "
      >
        <div className="flex items-center gap-2">
          {(!open || isMobile) && <SidebarTrigger />}
          <h1 className="font-semibold pt-1">Job Insight Mode</h1>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
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
