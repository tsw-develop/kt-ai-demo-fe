import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const PageContainer = ({ children, className }: Props) => {
  return (
    <div className={cn("flex flex-1 flex-col gap-[3rem] px-[3rem] py-[4rem]", className)}>
      {children}
    </div>
  );
};

export const PageHeader = ({ children, className }: Props) => {
  return <div className={cn("px-[15rem]", className)}>{children}</div>;
};

export const PageContent = ({ children, className, ref }: Props) => {
  return (
    <div ref={ref} className={cn("h-[calc(100vh-220px)] overflow-y-auto px-[15rem]", className)}>
      {children}
    </div>
  );
};
