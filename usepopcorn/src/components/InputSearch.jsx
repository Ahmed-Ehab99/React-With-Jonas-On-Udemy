import React, { useState } from "react";

export const InputSearch = () => {
  const [query, setQuery] = useState("");
  
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
