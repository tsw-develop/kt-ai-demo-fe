import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithRef, memo } from "react";

type Props = ComponentPropsWithRef<"div">;

export const Chat = memo(({ children, ...props }: Props) => {
  return (
    <Slot className="animate-in fade-in slide-in-from-bottom-15 w-fit duration-150" {...props}>
      {children}
    </Slot>
  );
});
