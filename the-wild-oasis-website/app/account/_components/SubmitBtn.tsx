"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({
  children,
  pendingLabel,
  disabled,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || disabled}
      className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitBtn;
