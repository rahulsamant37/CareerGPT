"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader, LogOutIcon, Sparkles, Settings } from "lucide-react";
import React from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface SidebarFooterContentProps {
  isSignedIn: boolean;
  isLoaded: boolean;
  userName: string;
  userInitial: string;
  emailAddress: string;
  credits: number;
  loadingCredit: boolean;
  onUpgradeClick: () => void;
  onSignOut: () => void;
}
const SidebarFooterContent = ({
  isSignedIn,
  isLoaded,
  userName,
  emailAddress,
  userInitial,
  credits,
  loadingCredit,
  onUpgradeClick,
  onSignOut,
}: SidebarFooterContentProps) => {
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center pb-5">
        <Loader size="2rem" className="animate-spin text-white" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {isSignedIn && (
        <div
          className="bg-gradient-to-r from-red-600
        to-primary rounded-lg p-4"
        >
          <h3 className="text-white font-semibold text-sm mb-1">
            {loadingCredit ? (
              <Loader />
            ) : (
              `Credits Balance: ${credits?.toFixed(1)}`
            )}
          </h3>
          <p className="text-white/80 text-xs mb-2">Ulock premium features</p>
          <Button
            onClick={onUpgradeClick}
            className="w-full bg-white text-primary
                      font-semibold hover:bg-white/90 text-sm
                      "
          >
            <Sparkles />
            Buy Credits
          </Button>
        </div>
      )}

      {isSignedIn && (
        <Popover>
          <PopoverTrigger asChild>
            <div
              role="button"
              className="
                flex items-center gap-3 p-2 rounded-lg
                hover:bg-gray-700/20
                transition-colors
              "
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className="
                  bg-primary/20 text-primary
                  border border-primary/30
                  "
                >
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white font-medium">{userName}</p>
                <p className="text-muted-foreground text-xs">{emailAddress}</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            className="
                  w-64 px-4 pt-5 pb-2 bg-background border-border
                  text-foreground
                  "
          >
            <div className="space-y-2">
              <h4
                className="font-semibold leading-none
                          text-sm !pl-1 mb-1"
              >
                Account
              </h4>

              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Theme</span>
                </div>
                <ThemeToggle />
              </div>

              <Button
                variant="ghost"
                onClick={onSignOut}
                className="w-full justify-start text-sm
                 !pl-1 !ring-0"
              >
                <LogOutIcon className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SidebarFooterContent;
