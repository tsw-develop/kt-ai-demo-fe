import { Chat } from "@/components/chat";
import { Button } from "@/components/ui/button";

interface Props {
  onClick?: (name: string) => void;
}

export const Summary = ({ onClick }: Props) => {
  return (
    <Chat>
      <div>
        <p>온보딩 요약 가이드:</p>
        <Button onClick={() => onClick?.("사내 규정 & 복지 요약 보기")}>
          [📄 사내 규정 & 복지 요약 보기]
        </Button>
        <p className="mt-[2.4rem]">
          혹시 지금까지 안내드린 내용 중에 다시 보고 싶은 파트가 있으신가요? <br />
          아래 항목 중 선택하셔도 되고, 없으시다면 “없어요” 또는 “괜찮습니다”라고 말씀해주셔도
          좋아요 😊
        </p>
        <div
          className="flex flex-col gap-[.9rem]"
          onClick={(e) => {
            const target = e.target as HTMLButtonElement;
            onClick?.(target.name);
          }}
        >
          <Button name="근무시간 & 재택근무">[🔁 근무시간 & 재택근무]</Button>
          <Button name="휴가/병가/육아휴직">[🔁 휴가/병가/육아휴직]</Button>
          <Button name="보안 규정">[🔁 보안 규정]</Button>
          <Button name="복지제도">[🔁 복지제도]</Button>
        </div>
      </div>
    </Chat>
  );
};
