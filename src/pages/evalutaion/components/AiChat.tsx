import axios from "axios";
import { memo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Chat } from "@/components/chat";

type SummaryData =
  | "사내 규정 & 복지 요약 보기"
  | "근무시간 & 재택근무"
  | "휴가/병가/육아휴직"
  | "보안 규정"
  | "복지제도";

const summaryDataMap = {
  "사내 규정 & 복지 요약 보기": "all",
  "근무시간 & 재택근무": "work-home",
  "휴가/병가/육아휴직": "holiday",
  "보안 규정": "security",
  복지제도: "welfare",
};

interface Props {
  type?: "문제풀이" | "총평";
  sessionId: string;
  userMessage: string;
  onEnd?: (isLoading: boolean) => void;
  onTaskEnd?: () => void;
}

export const AiChat = memo(
  ({ type = "문제풀이", sessionId, userMessage, onEnd, onTaskEnd }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiMessage, setAiMessage] = useState("");

    useEffect(() => {
      const call = async (message: string) => {
        setIsLoading(true);
        onEnd?.(false);

        const res = await fetch("http://52.231.108.153:8000/quiz/stream", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({
            session_id: sessionId,
            messages: message,
          }),
        });

        setIsLoading(false);
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) return;

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = decoder.decode(value || new Uint8Array(), { stream: true });
          setAiMessage((prev) => prev + text);
        }

        if (aiMessage.includes("신입사원 온보딩 평가 결과를 바탕으로 총평을 드리겠습니다.")) {
          onTaskEnd?.();
        }

        onEnd?.(true);
      };

      const call_2 = async (data: SummaryData) => {
        setIsLoading(true);
        onEnd?.(false);

        const res = await axios.get(
          `http://52.231.108.153:8000/summary-datas/${summaryDataMap[data]}`,
        );

        if (res.status === 200) {
          setAiMessage(res.data);
          setIsLoading(false);
          onEnd?.(true);
        }
      };

      if (type === "문제풀이") {
        call(userMessage);
      }

      if (type === "총평") {
        call_2(userMessage as SummaryData);
      }
    }, [sessionId, userMessage, type]);

    if (isLoading)
      return (
        <Chat>
          <span className="relative m-[1.6rem] flex size-[1.2rem]">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-primary relative inline-flex size-[1.2rem] rounded-full"></span>
          </span>
        </Chat>
      );

    return (
      <Chat>
        <ReactMarkdown className="max-w-[70rem]">{aiMessage}</ReactMarkdown>
      </Chat>
    );
  },
);
