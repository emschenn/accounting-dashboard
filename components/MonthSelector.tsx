import React from "react";

type Props = {};

function MonthSelector({}: Props) {
  return (
    <div className="text-5xl font-bold pb-6">
      {new Date().toLocaleString("default", {
        month: "short",
      })}
      <span className=" text-gold"> {new Date().getFullYear()}</span>
    </div>
  );
}

export default MonthSelector;
