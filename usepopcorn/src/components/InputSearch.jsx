import React, { useRef } from "react";
import { useKey } from "../custom-hooks/useKey";

export const InputSearch = ({ query, setQuery }) => {
  const inputRef = useRef(null);
  // Custom Hook
  useKey("Enter", function () {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
    />
  );
};
