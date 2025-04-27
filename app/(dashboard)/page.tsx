"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import JobInfoForm from "./_components/JobInfoForm";
import AppHighlights from "./_components/AppHighlights";

export default function Home() {
  const { open, isMobile } = useSidebar();
  return (
    <div
      className="w-full relative flex-1 min-h-screen flex
     flex-col items-center bg-gradient-to-br
     from-purple-500/5 to-primary/5
     px-4 sm:px-6 lg:px-8
    "
    >
      <div className="absolute left-5 top-5">
        {(!open || isMobile) && <SidebarTrigger />}
      </div>

      <div className="space-y-3 w-full max-w-7xl mx-auto">
        {/* <AppHighlights /> */}
        <AppHighlights />

        <div className="text-center mt-5">
          <h1
            className="text-[2.5rem] md:text-5xl lg:text-6xl
          font-bold bg-gradient-to-r from-primary
          to-purple-600 bg-clip-text text-[#070D1B]
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
              "
              />
              <span className="relative text-white z-10">Assistant</span>
            </span>
          </h1>

          <p
            className="text-base sm:text-lg text-gray-600
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

        <JobInfoForm />
      </div>
    </div>
  );
}
