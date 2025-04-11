import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  className?: string;
  children?: React.ReactNode;
  direction?: "left" | "right";
}

export const SpeechBubble = ({ children, className, direction = "right", ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-fit rounded-[20px] bg-[#FF7B7D] px-[1.6rem] py-[1rem] text-[1.8rem] leading-[2rem] font-normal text-white",
        direction === "left" ? "self-start rounded-tl-none" : "self-end rounded-tr-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
