"use client";

import SubmitBtn from "@/app/account/_components/SubmitBtn";
import { useReservation } from "@/context/ReservationContext";
import { createBookingAction } from "@/lib/actions";
import { CabinT } from "@/lib/types";
import { differenceInDays } from "date-fns";
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";

const ReservationForm = ({ cabin, user }: { cabin: CabinT; user: User }) => {
  const [numGuests, setNumGuests] = useState("");

  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate ?? "", startDate ?? "");
  const cabinPrice = numNights * ((regularPrice ?? 0) - (discount ?? 0));

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBookingAction.bind(null, bookingData);
  const isFormIncomplete = !range?.from || !range?.to || !numGuests;

  return (
    <div className="flex flex-col">
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-16 py-2">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            width={20}
            height={20}
            className="size-8 rounded-full"
            src={user.image || "default-user.webp"}
            alt={user.name || "UnKnown"}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          resetRange();
          await createBookingWithData(formData);
        }}
        className="bg-primary-900 flex flex-col gap-5 px-16 py-10 text-lg"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity as number }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {isFormIncomplete && (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}

          <SubmitBtn pendingLabel="Reserving..." disabled={isFormIncomplete}>
            Reserve now
          </SubmitBtn>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
