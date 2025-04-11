interface Props {
  children?: React.ReactNode;
}

export const ChatContainer = ({ children }: Props) => {
  return <div className="flex flex-col gap-[3rem]">{children}</div>;
};
