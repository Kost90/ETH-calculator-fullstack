import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calcFunc = (eth: number, price: number) => {
  let result = 0;
  if (eth > 0) {
    result = eth * price;
    return parseFloat(result.toFixed(2));
  }
  return result;
};
