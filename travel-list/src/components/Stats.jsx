import React from "react";

const Stats = ({ items }) => {
  if (!items.length)
    return <p className="stats">Start adding some items to your list 🚀</p>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "💼 You got everything! Ready to go ✈️"
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentagePacked}%)`}
      </em>
    </footer>
  );
};

export default Stats;
