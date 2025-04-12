import { useEffect, useRef, useState } from "react";

import { Chat, ChatContainer } from "@/components/chat";
import { ChatInput } from "@/components/ui/ChatInput";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

import { AiChat } from "./components/AiChat";

type MessageType = {
  type: "문제풀이" | "총평";
  content: string;
};

interface Props {
  sessionId: string;
}

const summaryDataMap = {
  "사내 규정 & 복지 요약 보기": "all",
  "근무시간 & 재택근무": "work-home",
  "휴가/병가/육아휴직": "holiday",
  "보안 규정": "security",
  복지제도: "welfare",
};

export const EvaluationPage = ({ sessionId }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Map<string, MessageType>>(new Map());
  const [isEnd, setIsEnd] = useState(true); // AI응답 완료 여부

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const send = (message: string) => {
    if (!isEnd) return;

    setIsEnd(false);

    if (Object.keys(summaryDataMap).includes(message)) {
      setMessages((prev) => {
        const newMap = new Map(prev);
        newMap.set(crypto.randomUUID(), { type: "총평", content: message });
        return newMap;
      });
      return;
    }

    setMessages((prev) => {
      const newMap = new Map(prev);
      newMap.set(crypto.randomUUID(), { type: "문제풀이", content: message });
      return newMap;
    });
  };

  const handleSummaryClick = (message: string) => {
    if (!isEnd) return;

    setIsEnd(false);

    setMessages((prev) => {
      const newMap = new Map(prev);
      newMap.set(crypto.randomUUID(), { type: "총평", content: message });
      return newMap;
    });
  };

  return (
    <>
      <ChatContainer ref={containerRef}>
        <AiChat sessionId={sessionId} userMessage="문제 생성" onEnd={setIsEnd} />
        {Array.from(messages.entries()).map(([key, message]) => {
          return (
            <div key={key} className="flex flex-col gap-[1.5rem]">
              <Chat>
                <SpeechBubble>{message.content}</SpeechBubble>
              </Chat>
              <AiChat
                type={message.type}
                sessionId={sessionId}
                userMessage={message.content}
                onEnd={setIsEnd}
                onSummaryClick={handleSummaryClick}
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
