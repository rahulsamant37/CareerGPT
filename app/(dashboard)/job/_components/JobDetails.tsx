import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Briefcase, Calendar, Loader } from "lucide-react";
import React from "react";

const JobDetails = (props: { jobId: string }) => {
  const job = useQuery(api.job.getJob, {
    jobId: props.jobId,
  });
  //api getJob
  if (job === undefined) {
    return (
      <div
        className="w-full flex justify-center gap-2
      p-5"
      >
        <Loader className="h-8 w-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (!job) return <div className="p-5 text-center text-gray-500 dark:text-gray-400">Job not found</div>;

  const date = new Date(job.createdAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-4 px-4 pb-5">
      <div className="w-full p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{job.jobTitle}</h2>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>Added on {formattedDate}</span>
        </div>

        <div className="!text-[15px] prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300">
          <div
            dangerouslySetInnerHTML={{
              __html: job.htmlFormatDescription || job.originalDescription,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
