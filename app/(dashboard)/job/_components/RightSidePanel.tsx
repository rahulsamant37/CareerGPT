import React from "react";
import JobDetails from "./JobDetails";

const RightSidePanel = (props: { jobId: string }) => {
  return (
    <div className="flex w-full h-screen overflow-y-auto">
      <div className="w-full">
        {/* {Job Details} */}
        <JobDetails jobId={props.jobId} />
      </div>
    </div>
  );
};

export default RightSidePanel;
