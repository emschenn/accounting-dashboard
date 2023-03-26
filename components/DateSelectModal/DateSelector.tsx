import React, { useMemo } from "react";

type Props = {
  selectedDateRange: { start: string; end: string };
  openModal: () => void;
};

function DateSelector({ selectedDateRange, openModal }: Props) {
  const shownDate = useMemo(() => {
    const { start: s, end: e } = selectedDateRange;
    const start = new Date(s);
    const end = new Date(e);

    const startY = start.getFullYear();
    const endY = end.getFullYear();

    const startM = start.getMonth() + 1;
    const endM = end.getMonth() + 1;

    const startD = start.getDate();
    const endD = end.getDate();

    const startMAbbr = start.toLocaleString("default", { month: "short" });
    const endMAbbr = end.toLocaleString("default", { month: "short" });

    const now = new Date();

    if (startM === endM && startY === endY) {
      let word = "";
      if (
        start.getDate() === 1 &&
        end.getDate() === now.getDate() &&
        start.getMonth() === now.getMonth()
      )
        word = startMAbbr.toUpperCase();
      else if (startD === 1 && endD >= new Date(endY, endM, 0).getDate())
        word = startMAbbr.toUpperCase();
      else word = `${startMAbbr.toUpperCase()} ${startD} - ${endD}`;

      if (startY !== now.getFullYear())
        return word + ` '${startY.toString().slice(-2)}`;
      return word;
    } else if (startY === endY) {
      let word = `${startMAbbr.toUpperCase()} ${startD} - ${endMAbbr.toUpperCase()} ${endD}`;
      if (startY !== now.getFullYear())
        return word + ` '${startY.toString().slice(-2)}`;
      return word;
    } else {
      return `${startMAbbr.toUpperCase()} ${startD}'${startY
        .toString()
        .slice(-2)} - ${endMAbbr.toUpperCase()} ${endD}'${endY
        .toString()
        .slice(-2)}`;
    }
  }, [selectedDateRange]);

  return <span onClick={openModal}>{shownDate}</span>;
}

export default DateSelector;
