import { createContext, useContext } from "react";

export const CitiesContext = createContext();

export function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("useCities must used inside CitiesProveder");
  return context;
}
