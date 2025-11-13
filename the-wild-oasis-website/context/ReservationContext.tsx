"use client";

import { ReservationContextType } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
