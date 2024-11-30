import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const changeImageZoomLink = (imageLink?: string) => {
  return imageLink?.replace("zoom=1", "zoom=3");
};
