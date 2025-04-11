import { Slot } from "@radix-ui/react-slot";
import { memo } from "react";

interface Props {
  children?: React.ReactNode;
}

export const Chat = memo(({ children }: Props) => {
  return (
    <Slot className="animate-in fade-in slide-in-from-bottom-15 w-fit duration-150">
      {children}
    </Slot>
  );
});
