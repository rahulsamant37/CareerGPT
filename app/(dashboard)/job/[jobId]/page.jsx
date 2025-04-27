import React from "react";
import JobResizablePanel from "../_components/JobResizablePanel";

export default function JobPage({ params }) {
  // Use the jobId directly as a string
  const jobId = params.jobId;
  
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
