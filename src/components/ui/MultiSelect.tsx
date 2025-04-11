import { ChevronDown } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useId,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";

import { cn } from "@/lib/utils";

import { Checkbox } from "./checkbox";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface Context {
  selectedValues: string[] | undefined;
  setSelectedValues: (values: string[]) => void;
  selectedLabels: Map<string, React.ReactNode>;
  setSelectedLabel: (value: string, label: React.ReactNode) => void;
}

const MultiSelectContext = createContext<Context | undefined>(undefined);

interface MultiSelectProps extends ComponentPropsWithoutRef<typeof Popover> {
  value: string[] | undefined;
  onValueChange?: (values: string[]) => void;
}

const MultiSelect = ({ children, value, onValueChange, ...props }: MultiSelectProps) => {
  const [selectedLabels, setSelectedLabels] = useState<Map<string, React.ReactNode>>(new Map());

  const setSelectedLabel = useCallback((value: string, label: React.ReactNode) => {
    setSelectedLabels((prev) => {
      const newMap = new Map(prev);
      newMap.set(value, label);
      return newMap;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedValues: value,
      setSelectedValues: (newValues: string[]) => {
        onValueChange?.(newValues);
      },
      selectedLabels,
      setSelectedLabel,
    }),
    [value, onValueChange, selectedLabels, setSelectedLabel],
  );

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <Popover {...props} modal>
        {children}
      </Popover>
    </MultiSelectContext.Provider>
  );
};

type MultiSelectTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

const MultiSelectTrigger = ({ children, className, ...props }: MultiSelectTriggerProps) => {
  return (
    <PopoverTrigger
      className={cn(
        "text-secondary flex h-[5.4rem] w-full items-center justify-between overflow-hidden rounded-[14px] border border-[#C1C1C1] bg-white pl-[1.4rem] text-[1.4rem] text-nowrap focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-[2.4rem] text-inherit opacity-50" />
    </PopoverTrigger>
  );
};

type MultiSelectValueProps = {
  placeholder?: string;
};

const MultiSelectValue = ({ placeholder }: MultiSelectValueProps) => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("MultiSelectValue는 MultiSelect 내에서 사용되어야 합니다.");
  }
  const { selectedValues, selectedLabels } = context;

  if (!selectedValues || selectedValues.length === 0) {
    return <div className="text-[1.6rem] text-[#A1A1A1]">{placeholder}</div>;
  }

  const selectedLabelsText = selectedValues.map((value) => {
    const label = selectedLabels.get(value);
    return label ? String(label) : value;
  });

  return (
    <div className="max-w-[16rem] truncate text-[1.6rem]">{selectedLabelsText.join(", ")}</div>
  );
};

type MultiSelectContentProps = ComponentPropsWithoutRef<typeof PopoverContent>;

const MultiSelectContent = ({ children, className, ...props }: MultiSelectContentProps) => {
  return (
    <PopoverContent
      className={cn(
        "flex max-h-[38.4rem] w-[--radix-popover-trigger-width] flex-col gap-[1.6rem] overflow-y-auto rounded-[4px]",
        className,
      )}
      {...props}
    >
      {children}
    </PopoverContent>
  );
};

type MultiSelectItemProps = {
  className?: string;
  children?: React.ReactNode;
  value: string;
};

const MultiSelectItem = ({ className, children, value }: MultiSelectItemProps) => {
  const id = useId();
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("MultiSelectItem는 MultiSelect 내에서 사용되어야 합니다.");
  }
  const { selectedValues, setSelectedValues, setSelectedLabel } = context;
  const isChecked = useMemo(
    () => selectedValues?.includes(value) ?? false,
    [selectedValues, value],
  );

  // 컴포넌트가 마운트될 때 레이블 정보 저장
  useEffect(() => {
    setSelectedLabel(value, children);
  }, [value, children, setSelectedLabel]);

  const handleChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedValues([...(selectedValues ?? []), value]);
      } else {
        setSelectedValues(selectedValues?.filter((v) => v !== value) ?? []);
      }
    },
    [selectedValues, value, setSelectedValues],
  );

  return (
    <div className={cn("flex items-center", className)}>
      <Checkbox id={id} value={value} checked={isChecked} onCheckedChange={handleChange} />
      <Label className="cursor-pointer pl-[.8rem] text-[1.4rem]" htmlFor={id}>
        {children}
      </Label>
    </div>
  );
};

export { MultiSelect, MultiSelectTrigger, MultiSelectContent, MultiSelectItem, MultiSelectValue };
