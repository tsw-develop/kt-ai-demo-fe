import axios from "axios";
import { useCallback, useRef, useState } from "react";

import { decodeUnicode } from "@/lib/utils";
import { useSessionStore } from "@/store/useSessionStore";

export type MessageItem = {
  id: string;
  type: "text" | "myText";
  content: string;
};

export const useChat = () => {
  const isFirstMessage = useRef(true);
  const messagesRef = useRef<MessageItem[]>([]);
  const [lastMessage, setLastMessage] = useState<MessageItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { sessionId, setStep } = useSessionStore();

  const send = useCallback(
    async (message: string) => {
      if (isFetching) return;

      try {
        setIsLoading(true);
        setIsFetching(true);
        const newMyMessage: MessageItem = {
          id: String(Date.now()),
          type: "myText",
          content: message,
        };

        if (!isFirstMessage.current) {
          setLastMessage({ ...newMyMessage });
        }

        await axios.post("http://52.231.108.153:8000/chat", {
          session_id: sessionId,
          message,
          is_first_message: isFirstMessage.current,
        });

        if (!isFirstMessage.current) {
          setLastMessage(null);
          messagesRef.current.push(newMyMessage);
        }

        isFirstMessage.current = false;

        const eventSource = new EventSource(`http://52.231.108.153:8000/stream/${sessionId}`);

        const currentBotMessage: MessageItem = {
          id: String(Date.now() + 1),
          type: "text",
          content: "",
        };

        eventSource.onmessage = (event) => {
          const decoded = decodeUnicode(event.data);
          setIsLoading(false);
          currentBotMessage.content += decoded;
          setLastMessage({ ...currentBotMessage });
        };

        eventSource.onerror = () => {
          eventSource.close();
          setLastMessage(null);
          messagesRef.current.push(currentBotMessage);
          setIsFetching(false);

          if (currentBotMessage.content.includes("이제 다음 단계로 넘어가겠습니다")) {
            setStep("온보딩평가");
          }
        };
      } catch {
        setIsFetching(false);
      }
    },
    [isFetching, sessionId],
  );

  return {
    messagesRef,
    lastMessage,
    send,
    isLoading,
    isFetching,
  };
};
