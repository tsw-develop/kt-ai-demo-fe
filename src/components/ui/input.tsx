import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"input"> {
  className?: string;
}

export const Input = ({ className, ...props }: Props) => {
  return (
    <input
      className={cn(
        "rounded-[14px] border border-[#C1C1C1] bg-white px-[2rem] py-[1.4rem]",
        className,
      )}
      {...props}
    />
  );
};
