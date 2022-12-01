import React from "react";

type Props = {};

function MonthSelector({}: Props) {
  return (
    <div className="pb-6 text-5xl font-bold text-neutral-700">
      {new Date().toLocaleString("default", {
        month: "short",
      })}
      <span className=" text-splitwise"> {new Date().getFullYear()}</span>
    </div>
  );
}

export default MonthSelector;
