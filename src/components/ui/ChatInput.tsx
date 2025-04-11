import { Mic, Paperclip, Smile } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  placeholder?: string;
  onEnter?: (content: string) => void | boolean | Promise<void>;
}

export const ChatInput = ({ placeholder, className, onEnter }: Props) => {
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.metaKey || e.shiftKey) {
        return;
      }

      e.preventDefault();

      const content = e.currentTarget.value;

      if (content && content.trim()) {
        const shouldContinue = onEnter?.(content);

        if (shouldContinue === false) {
          return;
        }

        e.currentTarget.value = "";
      }
    }
  };

  return (
    <div
      className={cn(
        "flex justify-between gap-[.8rem] rounded-[40px] bg-white px-[2.8rem] py-[1.5rem] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] [&_button]:cursor-pointer",
        className,
      )}
    >
      <button type="button">
        <Paperclip size={20} />
      </button>

      <textarea
        className="field-sizing-content max-h-[30rem] flex-1 resize-none outline-none"
        onKeyDown={handleEnter}
        placeholder={placeholder}
      />

      <div className="flex gap-[1.5rem]">
        <button type="button">
          <Smile size={20} />
        </button>
        <button type="button">
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
};
