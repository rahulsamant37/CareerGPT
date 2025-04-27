"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import JobInfoForm from "./_components/JobInfoForm";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BriefcaseIcon, LightbulbIcon, PenToolIcon } from "lucide-react";

export default function Home() {
  const { open, isMobile } = useSidebar();
  return (
    <div
      className="w-full relative flex-1 min-h-screen flex
     flex-col items-center bg-gradient-to-br
     from-purple-500/5 to-primary/5
     dark:from-primary/10 dark:to-purple-900/10
     px-4 sm:px-6 lg:px-8
    "
    >
      <div className="absolute left-5 top-5 z-10">
        {(!open || isMobile) && <SidebarTrigger className="bg-background/80 backdrop-blur-sm shadow-sm" />}
      </div>

      <div className="absolute right-5 top-5 z-10">
        <ThemeSwitcher />
      </div>

      <div className="space-y-8 w-full max-w-7xl mx-auto">
        <div className="text-center mt-32 md:mt-40">
          <h1
            className="text-[2.5rem] md:text-5xl lg:text-6xl
            font-bold bg-gradient-to-r from-primary
            to-purple-600 bg-clip-text text-transparent
            dark:from-primary dark:to-purple-400
            tracking-[-0.8px]
            "
          >
            AI Job Insight
            <span className="relative inline-block pl-3 sm:pl-5">
              <div
                className="absolute -right-2
                top-0 w-[180px]
                md:w-[220px] lg:w-[270px] h-10 sm:h-14
                lg:h-16 bg-primary rotate-2 rounded-lg z-10
                shadow-lg
                "
              />
              <span className="relative text-white z-10">Assistant</span>
            </span>
          </h1>

          <p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300
            mt-3 sm:mt-4 max-w-2xl mx-auto
            "
          >
            Join millions of{" "}
            <span className="relative inline-block">
              <span className="text-[#FB923C]">
                job seekers and professionals
              </span>
              <svg
                viewBox="0 0 336 10"
                className="absolute left-[1%] bottom-0 w-[97%]
                 h-[7px]"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 8.90571C100.5 7.40571 306.7 5.305715 334 8.90571"
                  stroke="#FB923C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            to instantly
            <br className="hidden sm:block" />
            get job insights and prepare for interviews with AI-powered tools
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Job Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Get detailed insights about job requirements, responsibilities, and qualifications.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <PenToolIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Resume Tailoring</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Get personalized suggestions to optimize your resume for specific job applications.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <LightbulbIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Interview Prep</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Prepare for interviews with AI-generated questions and suggested answers.</p>
          </div>
        </div>

        <JobInfoForm />
      </div>
    </div>
  );
}
