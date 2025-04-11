import { createContext, useContext } from "react";
import { create } from "zustand";

interface ChatStore {
  messages: React.ReactNode[];
  push: (message: React.ReactNode, delay?: number) => void;
}

export const createChatStore = () =>
  create<ChatStore>((set, get) => ({
    messages: [],
    push: (message, delay) => {
      const newMessages = [...get().messages, message];

      if (delay) {
        setTimeout(() => {
          set({ messages: newMessages });
        }, delay);
      } else {
        set({ messages: newMessages });
      }
    },
  }));

export type ChatContextType = ReturnType<typeof createChatStore>;

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContext");
  }

  return context;
};
