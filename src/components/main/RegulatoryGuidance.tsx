import { useEffect, useRef } from "react";

import { ChatContainer } from "@/components/chat";
import { MessageItemComponent } from "@/components/main/MessageItem";
import { ChatInput } from "@/components/ui/ChatInput";
import { useChat } from "@/hooks/useChat";

const RegulatoryGuidance = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messagesRef, lastMessage, send, isLoading, isFetching } = useChat();

  // console.log(isLoading, lastMessage);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messagesRef.current.length, lastMessage]);

  useEffect(() => {
    send("");
  }, []);

  return (
    <>
      <div ref={containerRef}>
        <ChatContainer>
          {messagesRef.current.map((m) => (
            <MessageItemComponent key={m.id} type={m.type} content={m.content} />
          ))}

          {isLoading ? (
            <span className="relative m-[1.6rem] flex size-[1.2rem]">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex size-[1.2rem] rounded-full"></span>
            </span>
          ) : (
            lastMessage && (
              <MessageItemComponent
                key={lastMessage.id}
                type={lastMessage.type}
                content={lastMessage.content}
              />
            )
          )}
        </ChatContainer>
      </div>
      <ChatInput
        className="fixed bottom-[2rem] left-[calc(50%+8rem)] w-[30%] translate-x-[calc(-50%+8rem)]"
        placeholder="무엇이든 물어보세요."
        onEnter={
          isFetching
            ? () => {
                return false;
              }
            : send
        }
      />
    </>
  );
};

export default RegulatoryGuidance;
