import {
  Backpack,
  Bell,
  Clock,
  FileText,
  MessageCircleMore,
  Plane,
  ReceiptText,
  Settings,
} from "lucide-react";
import { type ComponentProps } from "react";

import logo from "@/assets/image 2.svg?url";

export const Sidebar = () => {
  // const previousSelectedItem = useRef<HTMLButtonElement>(null);

  // const handleClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!(e.target instanceof HTMLButtonElement)) return;

  //   if (e.target.dataset.selected === "true") {
  //     e.target.dataset.selected = "false";
  //   } else {
  //     e.target.dataset.selected = "true";
  //   }

  //   if (!previousSelectedItem.current) {
  //     previousSelectedItem.current = e.target;
  //     return;
  //   }

  //   if (previousSelectedItem.current !== e.target) {
  //     previousSelectedItem.current.dataset.selected = "false";
  //     previousSelectedItem.current = e.target;
  //   }
  // };

  return (
    <aside className="h-dvh w-[31rem] bg-white">
      <img className="m-[5rem]" src={logo} alt="logo" />

      <div className="flex flex-col divide-y divide-[#BABABA]">
        <SidebarGroup>
          <SidebarContent>
            <Settings />내 프로필 설정
          </SidebarContent>
          <SidebarContent>
            <Bell />
            알림
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarContent data-selected="true">
            <Backpack />
            온보딩
          </SidebarContent>
          <SidebarContent>
            <Plane />
            휴가 신청
          </SidebarContent>
          <SidebarContent>
            <Clock />
            근무 기록 보기
          </SidebarContent>
          <SidebarContent>
            <ReceiptText />
            비용 청구
          </SidebarContent>
          <SidebarContent>
            <FileText />
            문서 제출함
          </SidebarContent>
          <SidebarContent>
            <MessageCircleMore />
            모비에게 물어보기
          </SidebarContent>
        </SidebarGroup>
      </div>
    </aside>
  );
};

interface SidebarGroupProps extends ComponentProps<"section"> {
  children?: React.ReactNode;
}

const SidebarGroup = ({ children, ...props }: SidebarGroupProps) => {
  return (
    <section className="flex flex-col gap-[1rem] px-[5rem] py-[3rem]" {...props}>
      {children}
    </section>
  );
};

interface SidebarContentProps extends ComponentProps<"button"> {
  children?: React.ReactNode;
}

const SidebarContent = ({ children, ...props }: SidebarContentProps) => {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-[1rem] rounded-[10px] px-[2.5rem] py-[1.2rem] font-semibold text-[#7C868F] transition-colors data-[selected=true]:bg-[#D9DDE0] data-[selected=true]:text-black"
      data-selected="false"
      {...props}
    >
      {children}
    </button>
  );
};
