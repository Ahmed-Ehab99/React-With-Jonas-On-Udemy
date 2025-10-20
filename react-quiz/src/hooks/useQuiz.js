import { createContext, useContext } from "react";

export const QuizContext = createContext();

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must used inside QuizProveder");
  return context;
}
