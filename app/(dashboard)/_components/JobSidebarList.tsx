"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { MessageSquareTextIcon, BriefcaseIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const JobSidebarList = (props: { userId: string }) => {
  const pathname = usePathname();
  const jobs = useQuery(api.job.getAllJobs, {
    userId: props.userId,
  });

  if (jobs === undefined) {
    return (
      <div className="w-full flex flex-col gap-3 px-2">
        <Skeleton className="h-[20px] w-full bg-gray-600" />
        <Skeleton className="h-[20px] w-full bg-gray-600" />
        <Skeleton className="h-[20px] w-full bg-gray-600" />
      </div>
    );
  }

  if (jobs?.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white/80 mt-2 flex items-center gap-2">
        <BriefcaseIcon className="w-4 h-4" />
        <span>Your Jobs</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu
          className="min-h-[180px] max-h-[350px]
             scrollbar overflow-y-auto pb-2
              "
        >
          {jobs?.map((item) => {
            const jobPageUrl = `/job/${item._id}`;
            const isActive = jobPageUrl === pathname;
            const date = new Date(item.createdAt);
            const formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });

            return (
              <SidebarMenuItem key={item._id}>
                <SidebarMenuButton
                  className={cn(
                    `
                    !bg-transparent !text-white hover:!bg-primary/10
                    transition-colors rounded-lg
                    `,
                    isActive && "!bg-primary/20 border-l-2 border-primary"
                  )}
                  asChild
                >
                  <Link href={jobPageUrl} className="text-white">
                    <MessageSquareTextIcon className="w-4 h-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.jobTitle}</span>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default JobSidebarList;
