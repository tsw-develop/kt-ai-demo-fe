import { create } from "zustand";

export type ChatHistory = {
  type: "AI_MESSAGE" | "USER_MESSAGE";
  content: string;
};

interface ChatHistoryStore {
  history: ChatHistory[];
  setHistory: (history: ChatHistory) => void;
}

export const useChatHistoryStore = create<ChatHistoryStore>((set, get) => ({
  history: [],
  setHistory: (newHistory) => {
    set({ history: [...get().history, newHistory] });
    localStorage.setItem("chatHistory", JSON.stringify(get().history));
  },
}));
