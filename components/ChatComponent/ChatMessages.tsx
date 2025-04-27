import { Id } from "@/convex/_generated/dataModel";
import { Role } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Loader, MessageSquareTextIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import useScrollToBottom from "@/hooks/use-scroll-bottom";

interface PropType {
  userName: string | null;
  data: any;
}
const ChatMessages = (props: PropType) => {
  const { data, userName } = props;

  const containerEndRef = useScrollToBottom([data]);

  const messages = useMemo(() => {
    if (!data || !data.success) return [];
    return data.data || [];
  }, [data]);

  if (data === undefined) {
    return (
      <div className="w-full flex justify-center gap-2 p-5">
        <Loader className="h-8 w-8 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div
      className="
      flex max-h-[calc(100vh-10.5rem)] flex-1
      flex-col gap-4 p-3 overflow-y-auto pt-8 pb-20
      scrollbar
      "
    >
      {/* {Messages } */}
      {messages && messages?.length > 0 ? (
        <>
          {messages?.map((message: any, index: number) => {
            const isUserMessage = message.role === Role.USER;

            return (
              <div
                key={message._id}
                className={cn("flex items-end", {
                  "justify-end": isUserMessage,
                })}
              >
                <div
                  className={cn(
                    `flex flex-col space-y-2 text-base max-w-lg mx-2`,
                    {
                      "order-1 items-end": isUserMessage,
                      "order-2 items-start !max-w-4xl": !isUserMessage,
                    }
                  )}
                >
                  <div
                    className={cn("flex gap-2", {
                      "items-end": isUserMessage,
                      "items-start": !isUserMessage,
                    })}
                  >
                    {/* {AI Avatar} */}

                    {!isUserMessage && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback
                          className="shrink-0 bg-primary/20 text-primary
                          text-sm
                          "
                        >
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn("px-4 py-2 rounded-lg inline-block shadow-sm", {
                        "bg-primary text-white": isUserMessage,
                        "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100": !isUserMessage,
                      })}
                    >
                      <div
                        key={`${message._id}-${index}`}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      />
                    </div>

                    {isUserMessage && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback
                          className="shrink-0
                         bg-gray-800 text-white text-sm"
                        >
                          {userName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div
          className="flex flex-col items-center
          justify-center gap-3 p-6 bg-gray-50 dark:bg-gray-800/30 rounded-lg mx-auto max-w-md"
        >
          <div className="p-3 bg-primary/10 rounded-full">
            <MessageSquareTextIcon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Your Job Insight Assistant is Ready!
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            Get tailored advice and insight to ace your job search. Ask questions about the job description, requirements, or how to prepare.
          </p>
        </div>
      )}

      <br />
      <br />
      <br />
      <div ref={containerEndRef} />
    </div>
  );
};

export default ChatMessages;
