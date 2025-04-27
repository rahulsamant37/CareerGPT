import React from "react";
import JobResizablePanel from "../_components/JobResizablePanel";
import { id } from "@/convex/_generated/dataModel";

interface JobPageProps {
  params: {
    jobId: string;
  }
}

export default function JobPage({ params }: JobPageProps) {
  // Convert the URL jobId parameter to a Convex ID
  const jobId = id("jobs", params.jobId);
  
  return (
    <div
      className="flex-1 bg-white justify-between flex
    flex-col h-screen overflow-hidden
    "
    >
      <div className="mx-auto w-full max-w-8xl grow lg:flex">
        <JobResizablePanel jobId={jobId} />
      </div>
    </div>
  );
}
