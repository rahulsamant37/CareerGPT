import React, { SetStateAction } from "react";
import { Button } from "../ui/button";

interface PropsType {
  isDisabled: boolean;
  onSubmit: (value: string) => void;
  setInput: React.Dispatch<SetStateAction<string>>;
}

const prompts = [
  "Summarize the job description",
  "Draft a cover letter",
  "Draft a resume",
  "What skills are needed?",
  "How to stand out?",
  "What are the key responsibilities?",
  "How do I fit this role?",
  "How to tailor my resume?",
  "What qualifications are required?",
  "What technologies are used?",
  "What's the salary range?",
  "What to ask in the interview?",
  "How to prepare for this role?",
  "What are the challenges?",
  "What are the key terms?",
  "What's the career growth?",
  "What are the benefits?",
];

const JobInsightSuggest = ({ isDisabled, setInput, onSubmit }: PropsType) => {
  const handlePromptClick = (prompt: string) => {
    onSubmit(prompt);
    setInput(prompt);
  };
  return (
    <div
      className="relative w-full mb-1.5"
    >
      <div
        className="flex gap-2 overflow-x-auto
        scrollbar pb-2 pl-0
        "
      >
        {prompts?.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            disabled={isDisabled}
            className="whitespace-nowrap rounded-full
                font-normal !text-[12.5px]
                hover:bg-gray-50 dark:hover:bg-gray-800
                border-gray-200 dark:border-gray-700
                text-gray-700 dark:text-gray-300
                transition-colors
                "
            onClick={() => handlePromptClick(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobInsightSuggest;
