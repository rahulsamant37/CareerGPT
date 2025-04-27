"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useSignInModal } from "@/hooks/use-signin-modal";
import { SignIn } from "@clerk/nextjs";

const SignInModal = () => {
  const { isOpen, close } = useSignInModal();
  const fallbackUrl = process.env.NEXT_PUBLIC_APP_URL;
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="sm:max-w-fit px-0
      !bg-transparent !border-0 !shadow-none
      "
      >
        <DialogTitle className="sr-only">Sign In</DialogTitle>
        <SignIn
          routing="hash"
          fallbackRedirectUrl={`${fallbackUrl}?signin=true`}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
