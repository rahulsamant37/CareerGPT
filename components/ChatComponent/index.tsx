import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface PropsType {
  jobId: string;
  userId: string | null;
  userName: string | null;
}
const ChatComponent = (props: PropsType) => {
  const { jobId, userId, userName } = props;

  const data = useQuery(
    api.jobInsightConversation.getMessagesByJobId,
    jobId ? { id: jobId } : "skip"
  );
  return (
    <div
      className="relative h-full bg-background
      flex divide-y divide-gray-200 dark:divide-gray-800 flex-col
      justify-between gap-2 rounded-lg shadow-sm
      "
    >
      <div className="flex flex-1 justify-between gap-2">
        <ChatMessages userName={userName} data={data} />
      </div>

      <ChatInput
        jobId={jobId}
        userId={userId}
        isDisabled={data === undefined}
      />
    </div>
  );
};

export default ChatComponent;
