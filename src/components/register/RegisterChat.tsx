import { useEffect } from "react";
import { useStore } from "zustand";

import { useChatContext } from "@/store/useChatStore";

import { ChatContainer, Chat } from "../chat";
import { Greeting } from "../chat/static-chat";

export const RegisterChat = () => {
  const context = useChatContext();

  const { messages, push } = useStore(context);

  useEffect(() => {
    push(<Greeting />);
  }, [push]);

  return (
    <ChatContainer>
      {messages.map((item, index) => (
        <Chat key={index}>{item}</Chat>
      ))}
    </ChatContainer>
  );
};
