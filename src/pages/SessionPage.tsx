import { Navigate } from "react-router-dom";

import RegulatoryGuidance from "@/components/main/RegulatoryGuidance";
import { PageContainer, PageHeader, PageContent } from "@/components/PageLayout";
import { EvaluationPage } from "@/pages/evalutaion/EvaluationPage";
import { useSessionStore } from "@/store/useSessionStore";

const STEP_LEVEL = {
  인적사항: 0,
  "사내 규정 안내": 1,
  온보딩평가: 2,
} as const;

export const SessionPage = () => {
  const { sessionId, step } = useSessionStore();

  if (!sessionId) {
    return <Navigate to="/" />;
  }

  // const prev = localStorage.getItem("chatHistory");

  // if (prev) {
  //   console.log(prev);
  // }

  return (
    <PageContainer>
      <PageHeader>
        <h2 className="text-[3.2rem] font-bold text-[#4C4C4C]">{step}</h2>
      </PageHeader>

      <PageContent>
        {STEP_LEVEL[step] >= 1 && <RegulatoryGuidance />}
        {STEP_LEVEL[step] >= 2 && <EvaluationPage sessionId={sessionId} />}
      </PageContent>
    </PageContainer>
  );
};
