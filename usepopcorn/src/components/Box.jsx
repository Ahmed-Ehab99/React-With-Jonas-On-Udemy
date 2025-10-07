import React, { useState } from "react";
import { ToggleButton } from "./ToggleButton";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
};

export default Box;
