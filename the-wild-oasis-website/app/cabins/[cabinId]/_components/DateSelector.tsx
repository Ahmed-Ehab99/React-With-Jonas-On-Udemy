"use client";

import { useReservation } from "@/context/ReservationContext";
import { CabinT, SettingsT } from "@/lib/types";
import { isAlreadyBooked } from "@/lib/utils";
import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type DateSelectorProps = {
  settings: SettingsT;
  bookedDates: Date[];
  cabin: CabinT;
};

function DateSelector({ settings, bookedDates, cabin }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange =
    range && !isAlreadyBooked(range, bookedDates)
      ? range
      : { from: undefined, to: undefined };

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * ((regularPrice ?? 0) - (discount ?? 0));

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={(minBookingLength ?? 0) + 1}
        max={maxBookingLength ?? 0}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="bg-accent-500 text-primary-800 flex h-[72px] w-full items-center justify-between px-8">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount && discount > 0 ? (
              <>
                <span className="text-2xl">
                  ${(regularPrice ?? 0) - (discount ?? 0)}
                </span>
                <span className="text-primary-700 font-semibold line-through">
                  ${regularPrice ?? 0}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice ?? 0}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border-primary-800 border px-4 py-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
