import React, { useState, useEffect } from "react";

type Props = {
  selectedDateRange: { start: string; end: string };
  openModal: () => void;
};

function DateSelector({ selectedDateRange, openModal }: Props) {
  const [shownDate, setShownDate] = useState<string>("");
  useEffect(() => {
    const { start, end } = selectedDateRange;
    if (start.slice(0, 7) === end.slice(0, 7)) {
      let year = +start.slice(0, 4);
      let month = +start.slice(5, 7);
      setShownDate(`${month} ${year}`);
    } else {
      setShownDate(`${start}-${end}`);
    }
  }, [selectedDateRange]);

  return (
    <div
      className="pb-6 text-5xl font-bold text-neutral-700"
      onClick={openModal}
    >
      {shownDate}
      {/* {new Date().toLocaleString("default", {
        month: "short",
      })} */}
      {/* <span className=" text-splitwise"> {new Date().getFullYear()}</span> */}
    </div>
  );
}

export default DateSelector;
