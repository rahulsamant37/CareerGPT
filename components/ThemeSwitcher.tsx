"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        className={`px-3 ${
          theme === "light" ? "text-white" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Sun className="h-4 w-4 mr-1" />
        <span className="text-xs">Light</span>
      </Button>
      
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        className={`px-3 ${
          theme === "dark" ? "text-white" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Moon className="h-4 w-4 mr-1" />
        <span className="text-xs">Dark</span>
      </Button>
      
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
        className={`px-3 ${
          theme === "system" ? "text-white" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Monitor className="h-4 w-4 mr-1" />
        <span className="text-xs">Auto</span>
      </Button>
    </div>
  );
}
