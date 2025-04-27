import { useEffect, useRef } from "react";

const useScrollToBottom = (dependencies: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, dependencies);

  return messagesEndRef;
};

export default useScrollToBottom;
