"use client";
import React from "react";
import { SidebarGroup } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSignInModal } from "@/hooks/use-signin-modal";

const SignInPrompt = () => {
  const { open } = useSignInModal();

  return (
    <SidebarGroup>
      <div
        className="w-full h-[50vh] flex flex-col
      items-center justify-center shrink-0
      "
      >
        <Image
          src="/signin-prompt.svg"
          alt=""
          width={212}
          height={102}
          className="max-w-[90%]"
        />
        <span
          className="text-[rgba(255,255,255,.5)] 
        max-w-[180px] -m-2 text-sm font-medium mx-auto text-center"
        >
          Sign in for free to save your job history
        </span>
        <Button onClick={open} className="mt-6">
          Sign in
        </Button>
      </div>
    </SidebarGroup>
  );
};

export default SignInPrompt;
