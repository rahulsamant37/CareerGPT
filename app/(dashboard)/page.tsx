"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import JobInfoForm from "./_components/JobInfoForm";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  BriefcaseIcon,
  PlusCircle,
  FileText,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useUser } from "@clerk/nextjs";
import { useSignInModal } from "@/hooks/use-signin-modal";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { open, isMobile } = useSidebar();
  const { isSignedIn, user } = useUser();
  const { open: openSignInModal } = useSignInModal();

  // Sample data for the dashboard
  const recentJobs = [
    { id: '1', title: 'Senior Frontend Developer', company: 'Tech Solutions Inc.', date: '2 days ago', status: 'Analyzed' },
    { id: '2', title: 'Product Manager', company: 'Innovate Labs', date: '5 days ago', status: 'In Progress' },
    { id: '3', title: 'UX Designer', company: 'Creative Studios', date: '1 week ago', status: 'Completed' }
  ];

  const stats = [
    { label: 'Jobs Analyzed', value: '12', icon: BriefcaseIcon },
    { label: 'Resume Matches', value: '85%', icon: FileText },
    { label: 'Interview Prep', value: '8', icon: MessageSquare },
    { label: 'Saved Jobs', value: '5', icon: BriefcaseIcon }
  ];

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2 mr-4">
            {(!open || isMobile) && (
              <SidebarTrigger className="mr-2" />
            )}
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-md p-1 flex items-center justify-center">
                <span className="text-white font-bold text-sm">JA</span>
              </div>
              <span className="font-semibold text-foreground hidden sm:inline-block">
                Job<span className="text-primary font-bold">Assistant</span>
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-sm mr-4 hidden md:flex">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search jobs..."
              className="pl-10 bg-muted/40"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />

            {!isSignedIn ? (
              <Button
                onClick={openSignInModal}
                className="bg-primary hover:bg-primary/90"
                size="sm"
              >
                Sign In
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                  Welcome, {user?.firstName || 'User'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to your job search assistant dashboard
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => document.getElementById('job-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Job Analysis
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Jobs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Jobs</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>

            <div className="rounded-lg border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Job Title</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Company</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{job.title}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{job.company}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{job.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            job.status === 'Analyzed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : job.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Job Analysis Form */}
          <div id="job-form" className="space-y-4 pt-4 scroll-mt-20">
            <div>
              <h2 className="text-xl font-semibold">Analyze New Job</h2>
              <p className="text-muted-foreground">
                Paste a job description to get AI-powered insights and recommendations
              </p>
            </div>

            <JobInfoForm />
          </div>
        </div>
      </main>
    </div>
  );
}
