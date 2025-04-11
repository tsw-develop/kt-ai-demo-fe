import { useMemo } from "react";

import { PageContainer, PageHeader, PageContent } from "@/components/PageLayout";
import { RegisterChat } from "@/components/register/RegisterChat";
import { ChatContext, createChatStore } from "@/store/useChatStore";

export const RegisterPage = () => {
  const store = useMemo(() => createChatStore(), []);

  return (
    <PageContainer>
      <PageHeader>
        <h2 className="text-[3.2rem] font-bold text-[#4C4C4C]">인적사항</h2>
      </PageHeader>
      <PageContent>
        <ChatContext.Provider value={store}>
          <RegisterChat />
        </ChatContext.Provider>
      </PageContent>
    </PageContainer>
  );
};
