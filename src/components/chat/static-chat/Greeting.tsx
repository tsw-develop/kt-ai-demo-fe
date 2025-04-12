import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectItem,
} from "@/components/ui/MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { DEPARTMENTS } from "@/constants/departments";
import { TECH_STACKS } from "@/constants/techStacks";
import { useChatContext } from "@/store/useChatStore";
import { useSessionStore } from "@/store/useSessionStore";

interface Props {
  className?: string;
}

export const Greeting = ({ className }: Props) => {
  const context = useChatContext();

  const push = useStore(context, (state) => state.push);

  return (
    <div className={className}>
      <span>
        👋 팀에 오신 것을 환영합니다! <br /> 지금부터 온보딩을 시작하겠습니다. 10-15분 가량 소요되는
        점을 미리 알려드려요
      </span>
      <br />
      <span>시작할 준비 되셨나요?</span>
      <div
        className="flex gap-[.8rem]"
        onClick={(e) => {
          e.currentTarget.style.display = "none";
        }}
      >
        <Button
          onClick={(e) =>
            push(
              <SpeechBubble
                onAnimationEnd={() => {
                  push(
                    <div className="flex flex-col">
                      <span>좋습니다! 이제 인적사항을 기입해주셔야 합니다.</span>
                      <span>아래 박스에 내 정보를 기재해주세요.</span>
                      <InfoForm />
                    </div>,
                    300,
                  );
                }}
              >
                {e.currentTarget.textContent}
              </SpeechBubble>,
            )
          }
        >
          네, 준비됐어요
        </Button>
        <Button onClick={(e) => push(<SpeechBubble>{e.currentTarget.textContent}</SpeechBubble>)}>
          나중에 이따 할게요
        </Button>
      </div>
    </div>
  );
};

const InfoForm = () => {
  const { setSessionId, setStep } = useSessionStore();
  const navigate = useNavigate();
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setIsLoading(true);

    const res = await axios.post("http://52.231.108.153:8000/users", {
      name: formData.get("name"),
      email: formData.get("email"),
      team: formData.get("team"),
      position: formData.get("position"),
      tech_stacks: selectedTechStacks,
    });

    if (res.status === 200) {
      setSessionId(res.data.session_id);
      navigate("/onboarding");
      setStep("사내 규정 안내");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[.9rem]">
      <div className="flex flex-col gap-[.9rem]">
        <Label>이름*</Label>
        <Input name="name" placeholder="한글 이름을 기입해주세요." />
      </div>
      <div className="flex flex-col gap-[.9rem]">
        <Label>이메일 주소*</Label>
        <Input type="email" name="email" placeholder="사내 이메일을 기입해주세요." />
      </div>
      <div className="flex flex-col gap-[.9rem]">
        <Label>부서*</Label>
        <Select name="team">
          <SelectTrigger>
            <SelectValue placeholder="부서를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENTS.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-[.9rem]">
        <Label>포지션*</Label>
        <Input name="position" placeholder="포지션을 기입해주세요." />
      </div>
      <div className="flex flex-col gap-[.9rem]">
        <Label>기술스택*</Label>
        <MultiSelect value={selectedTechStacks} onValueChange={setSelectedTechStacks}>
          <MultiSelectTrigger>
            <MultiSelectValue placeholder="기술스택을 선택해주세요" />
          </MultiSelectTrigger>
          <MultiSelectContent className="max-h-[30rem]">
            {TECH_STACKS.map((techStack) => (
              <MultiSelectItem key={techStack} value={techStack}>
                {techStack}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>
      <Button
        type="submit"
        className="bg-primary flex w-full justify-center border-none text-white"
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "제출하기"}
      </Button>
    </form>
  );
};
