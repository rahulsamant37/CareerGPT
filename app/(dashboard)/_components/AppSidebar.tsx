"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import JobSidebarList from "./JobSidebarList";
import SignInPrompt from "./SignInPrompt";
import SidebarFooterContent from "./SidebarFooterContent";
import { useAuth, useUser } from "@clerk/nextjs";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const AppSidebar = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { openModal } = useUpgradeModal();
  const userId = user?.id || null;

  const apiLimits = useQuery(api.apiLimit.getUserCredits, {
    userId: user?.id || "",
  });

  const loadingCredit = apiLimits === undefined;
  const credits = apiLimits?.credits !== undefined ? apiLimits?.credits : 0;

  return (
    <>
      <Sidebar className="!bg-[rgb(33,33,33)] px-2">
        <SidebarHeader
          className="flex flex-row w-full items-center
                    justify-between m-[4px_0px_0px]
                    "
        >
          <Link href="/" className="text-white text-xl">
            Job<b className="text-primary">Assistant</b>.ai
          </Link>
          <SidebarTrigger className="!text-white !p-0 !bg-gray-800" />
        </SidebarHeader>
        <SidebarContent className="overflow-hidden">
          <SidebarGroup>
            <SidebarGroupContent>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full 
            !bg-transparent !text-white
            border-[rgba(255,255,255,.2)]
            mt-3 !h-10 !rounded-lg !font-medium text-sm
            hover:!bg-gray-700 transition-colors
            "
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>New Job</span>
                </Button>
              </Link>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* {Job List} */}
          {userId && <JobSidebarList {...{ userId }} />}

          {/* {Sign In Prompt} */}
          {!isSignedIn && isLoaded ? <SignInPrompt /> : null}
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterContent
            isSignedIn={isSignedIn || false}
            isLoaded={isLoaded}
            userName={user?.fullName!}
            emailAddress={user?.primaryEmailAddress?.emailAddress!}
            userInitial={user?.firstName?.charAt(0) || ""}
            credits={credits}
            loadingCredit={loadingCredit}
            onUpgradeClick={openModal}
            onSignOut={() =>
              signOut({
                redirectUrl: "/",
              })
            }
          />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
