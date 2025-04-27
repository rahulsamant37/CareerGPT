import React from "react";
import JobResizablePanel from "../_components/JobResizablePanel";

async function Page({ params }: any) {
  const { jobId } = await params;
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

export default Page;
