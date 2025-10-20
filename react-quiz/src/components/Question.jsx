import React from "react";
import { useQuiz } from "../hooks/useQuiz";
import Options from "./Options";

const Question = () => {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions.at(index);
  return (
    <>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </>
  );
};

export default Question;
