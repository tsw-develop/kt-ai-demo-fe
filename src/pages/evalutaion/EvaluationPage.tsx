import { useEffect, useRef, useState } from "react";

import { Chat, ChatContainer } from "@/components/chat";
import { ChatInput } from "@/components/ui/ChatInput";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

import { AiChat } from "./components/AiChat";
import { Summary } from "./components/Summary";

interface Props {
  sessionId: string;
}

export const EvaluationPage = ({ sessionId }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Map<string, string>>(new Map());
  const [isEnd, setIsEnd] = useState(true); // AI응답 완료 여부
  const [isTaskEnd, setIsTaskEnd] = useState(false); // 총평 단계 여부

  const send = (message: string) => {
    if (!isEnd || isTaskEnd) return;

    setIsEnd(false);

    setMessages((prev) => {
      const newMap = new Map(prev);
      newMap.set(crypto.randomUUID(), message);
      return newMap;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  return (
    <>
      <ChatContainer>
        <AiChat sessionId={sessionId} userMessage="문제 생성" />
        {!isTaskEnd && <Summary onClick={send} />}
        {Array.from(messages.entries()).map(([key, message]) => {
          return (
            <div key={key} className="flex flex-col gap-[1.5rem]">
              <Chat>
                <SpeechBubble>{message}</SpeechBubble>
              </Chat>
              <AiChat
                type={!isTaskEnd ? "총평" : "문제풀이"}
                sessionId={sessionId}
                userMessage={message}
                onEnd={setIsEnd}
                onTaskEnd={() => setIsTaskEnd(true)}
              />
            </div>
          );
        })}
      </ChatContainer>
      <ChatInput
        className="fixed bottom-[2rem] left-[calc(50%+8rem)] w-[30%] translate-x-[calc(-50%+8rem)]"
        placeholder="무엇이든 물어보세요."
        onEnter={send}
      />
    </>
  );
};
