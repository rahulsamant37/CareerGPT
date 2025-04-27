"use node";
import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { processAndCleanJobDescription } from "@/lib/job-process";
import { genAI } from "@/lib/gemini-ai";
import { api } from "./_generated/api";
import { JobInsightStatus, JobStatus, Role } from "@/lib/constants";
import { getJobTitleDescPrompt } from "@/lib/prompt";

export const processJobWithAI = internalAction({
  args: {
    jobId: v.id("jobs"),
    userId: v.string(),
    jobDescription: v.string(),
  },
  handler: async (ctx, args) => {
    const processedDesc = await processAndCleanJobDescription(
      args.jobDescription
    );

    let title = "Untitled";
    let htmlDescription = "";
    try {
      const prompt = getJobTitleDescPrompt(processedDesc);
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          maxOutputTokens: 2000,
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      });
      if (response.text) {
        const parsedResponse = JSON.parse(response.text);
        title = parsedResponse.title;
        htmlDescription = parsedResponse.htmlDescription;
      }
    } catch (error) {
      console.log("AI processing failed", error);
    }

    await ctx.runMutation(api.job.updateJob, {
      jobId: args.jobId,
      jobTitle: title,
      processedDescription: processedDesc,
      htmlFormatDescription: htmlDescription,
      status: JobStatus.READY,
    });

    // Send welcome message
    await ctx.scheduler.runAfter(0, api.jobInsightConversation.create, {
      userId: args.userId,
      jobId: args.jobId,
      text: welcomeMessage(title),
      role: Role.AI,
      status: JobInsightStatus.COMPLETED,
    });
  },
});

const welcomeMessage = (title: string) => `
  <h3 style="font-weight: 600; margin-bottom: 1rem;">Welcome to your Job Insight Assistant!</h3>
  <p style="margin-bottom: 1rem;">I've analyzed the <strong style="font-weight: 550;">${title}</strong> position.</p>
  <p style="margin-bottom: 1rem;">Here's what I can help with:</p>
  <ul style="list-style-type: circle; list-style-position: outside; margin-bottom: 1rem;">
    <li style="margin-bottom: 0.5rem;">
      <h5 style="font-weight: 500;">📝 CV Optimization:</h5>
      <p>Tailor your CV to match the job description and highlight relevant skills.</p>
    </li>
    <li style="margin-bottom: 0.5rem;">
      <h5 style="font-weight: 500;">🔍 Skill Analysis:</h5>
      <p>Identify key skills and gaps to focus on.</p>
    </li>
    <li style="margin-bottom: 0.5rem;">
      <h5 style="font-weight: 500;">📊Specific Insights:</h5>
      <p>Understand the role's requirements, responsibilities, and expectations.</p>
    </li>
  </ul>
  <p>What would you like to focus on first?</p>
`;
