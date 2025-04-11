import { useCallback, useRef } from "react";

type Chat = {
  type: "AI_MESSAGE" | "USER_MESSAGE";
  content: string;
};

export const useChatHistory = () => {
  const chatHistory = useRef<Chat[]>([]);

  const push = useCallback((chat: Chat) => {
    chatHistory.current.push(chat);
  }, []);

  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory.current));
  }, []);

  return {
    push,
    saveToLocalStorage,
  };
};
