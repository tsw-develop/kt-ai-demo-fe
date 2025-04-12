import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"div">;

export const ChatContainer = ({ children, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-[3rem]" {...props}>
      {children}
    </div>
  );
};
