import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeUnicode = (raw: string): string => {
  try {
    return JSON.parse(`${raw}`);
  } catch {
    return raw;
  }
};
