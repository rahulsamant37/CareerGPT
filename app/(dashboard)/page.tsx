"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import JobInfoForm from "./_components/JobInfoForm";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import {
  BriefcaseIcon,
  LightbulbIcon,
  PenToolIcon,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  FileText,
  MessageSquare,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useSignInModal } from "@/hooks/use-signin-modal";

export default function Home() {
  const { open, isMobile } = useSidebar();
  const { isSignedIn, user } = useUser();
  const { open: openSignInModal } = useSignInModal();

  const handleGetStarted = () => {
    if (!isSignedIn) {
      openSignInModal();
    }
    // If signed in, the page will scroll to the job form
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
      jobForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              {(!open || isMobile) && (
                <SidebarTrigger className="mr-4 bg-background/80 backdrop-blur-sm shadow-sm" />
              )}
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-md p-1 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JA</span>
                </div>
                <span className="text-xl font-semibold text-foreground">
                  Job<span className="text-primary font-bold">Assistant</span>.ai
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeSwitcher />

              {!isSignedIn ? (
                <Button
                  onClick={openSignInModal}
                  className="bg-primary hover:bg-primary/90"
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Job Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Land Your Dream Job with <span className="text-primary">AI Assistance</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl">
                Analyze job descriptions, tailor your resume, and prepare for interviews with our AI-powered tools designed to give you the competitive edge.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium"
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background text-primary font-medium text-xs`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4,000+</span> job seekers helped this month
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-900/10"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground">AI Job Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">AI Assistant:</span> I've analyzed the job description. Here are the key requirements:
                      </p>
                      <ul className="mt-2 space-y-1">
                        {['5+ years of experience in software development', 'Proficiency in React and TypeScript', 'Experience with cloud services'].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-primary/90 font-medium">
                        Your resume matches 85% of the requirements. Here are suggestions to improve your application...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '93%', label: 'Success Rate', icon: TrendingUp },
              { value: '10K+', label: 'Jobs Analyzed', icon: BriefcaseIcon },
              { value: '5K+', label: 'Resumes Improved', icon: FileText },
              { value: '98%', label: 'User Satisfaction', icon: Users }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">How JobAssistant.ai Helps You</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to help you at every stage of your job search
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BriefcaseIcon,
                title: 'Job Analysis',
                description: 'Get detailed insights about job requirements, responsibilities, and qualifications to understand if it is the right fit for you.',
                colorClass: 'bg-primary/10',
                iconClass: 'text-primary'
              },
              {
                icon: PenToolIcon,
                title: 'Resume Tailoring',
                description: "Receive personalized suggestions to optimize your resume for specific job applications and stand out from other candidates.",
                colorClass: 'bg-purple-500/10',
                iconClass: 'text-purple-500'
              },
              {
                icon: LightbulbIcon,
                title: 'Interview Preparation',
                description: "Prepare for interviews with AI-generated questions and suggested answers based on the job description and your experience.",
                colorClass: 'bg-amber-500/10',
                iconClass: 'text-amber-500'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background rounded-xl shadow-lg border border-border/50 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`p-3 ${feature.colorClass} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.iconClass}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">What Our Users Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Thousands of job seekers have found success with our AI assistant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "JobAssistant.ai helped me land my dream job at a tech company. The AI analysis of job descriptions was spot on!",
                author: "Sarah K.",
                role: "Software Engineer"
              },
              {
                quote: "I was struggling with tailoring my resume for each application. This tool saved me hours and improved my response rate by 70 percent.",
                author: "Michael T.",
                role: "Marketing Manager"
              },
              {
                quote: "The interview preparation feature is incredible. I felt so confident going into interviews after using this platform.",
                author: "Jessica L.",
                role: "Product Designer"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-background rounded-xl shadow-md border border-border/50 p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Award key={star} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="job-form">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Get Started Now</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Paste a job description below to receive AI-powered insights and recommendations
            </p>
          </div>

          <JobInfoForm />

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              By using our service, you agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-md p-1 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JA</span>
                </div>
                <span className="text-xl font-semibold text-foreground">
                  Job<span className="text-primary font-bold">Assistant</span>.ai
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered job search assistant helping you land your dream job.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Testimonials", "FAQ"]
              },
              {
                title: "Resources",
                links: ["Blog", "Career Tips", "Resume Templates", "Interview Guide"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact", "Privacy Policy"]
              }
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-semibold text-foreground mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} JobAssistant.ai. All rights reserved.
            </p>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social, i) => (
                <Link key={i} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
