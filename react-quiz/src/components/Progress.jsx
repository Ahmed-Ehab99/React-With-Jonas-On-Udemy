import React from "react";
import { useQuiz } from "../hooks/useQuiz";

const Progress = () => {
  const { index, numQuestions, points, totalPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
};

export default Progress;
