import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"button"> {
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...props }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "w-fit cursor-pointer rounded-[14px] border border-[#C1C1C1] bg-white px-[2rem] py-[1.4rem] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
