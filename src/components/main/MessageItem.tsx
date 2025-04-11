// MessageItem.tsx
import { memo } from "react";
import ReactMarkdown from "react-markdown";

import { SpeechBubble } from "../ui/SpeechBubble";

export const MessageItemComponent = memo(
  ({ type, content }: { type: "text" | "myText"; content: string }) => {
    return type === "text" ? (
      <div className="prose">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    ) : (
      <SpeechBubble direction="right">{content}</SpeechBubble>
    );
  },
  (prev, next) => prev.content === next.content && prev.type === next.type,
);
