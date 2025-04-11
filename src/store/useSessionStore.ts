import { create } from "zustand";

export interface SessionStore {
  step: "인적사항" | "사내 규정 안내" | "온보딩평가";
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  setStep: (step: "인적사항" | "사내 규정 안내" | "온보딩평가") => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessionId: "",
  step: "인적사항",
  setSessionId: (sessionId) => set({ sessionId }),
  setStep: (step) => set({ step }),
}));
