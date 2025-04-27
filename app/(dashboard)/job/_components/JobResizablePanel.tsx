"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import RightSidePanel from "./RightSidePanel";
import ChatLeftPanel from "./ChatLeftPanel";

const JobResizablePanel = (props: { jobId: string }) => {
  const { isMobile } = useSidebar();
  return (
    <ResizablePanelGroup
      direction={isMobile ? "vertical" : "horizontal"}
      className="w-full h-full"
    >
      <ResizablePanel defaultSize={isMobile ? 100 : 55}>
        {/* {Chat Ui} */}
        <ChatLeftPanel jobId={props.jobId} />
      </ResizablePanel>

      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={isMobile ? 25 : 45} className={"pt-2"}>
        {/* {jOB Details} */}
        <RightSidePanel jobId={props.jobId} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default JobResizablePanel;
