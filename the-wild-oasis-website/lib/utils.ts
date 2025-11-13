import { clsx, type ClassValue } from "clsx";
import { isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAlreadyBooked(range: DateRange, datesArr: Date[]): boolean {
  return (
    !!range.from &&
    !!range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! }),
    )
  );
}
