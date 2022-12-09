import React, { useState, useEffect } from "react";

type Props = {
  selectedDateRange: { start: string; end: string };
  openModal: () => void;
};

type DateTimeFormatOptions = {
  weekday?: "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
};

function DateSelector({ selectedDateRange, openModal }: Props) {
  const [shownDate, setShownDate] = useState<string>("");
  const [dateStyle, setDateStyle] = useState<string>("");

  useEffect(() => {
    const { start, end } = selectedDateRange;
    if (start.slice(0, 7) === end.slice(0, 7)) {
      const option: DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
      };
      new Date(start).toLocaleDateString("en-US", option);
      const date = new Date(start).toLocaleDateString("en-US", option);
      setShownDate(date.replace(" ", ", "));
      setDateStyle("text-4xl");
    } else {
      const option: DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let startDate = new Date(start).toLocaleDateString("en-US", option);
      let endDate = new Date(end).toLocaleDateString("en-US", option);
      if (endDate.slice(-4) === startDate.slice(-4)) {
        startDate = startDate.slice(0, -6);
      }
      setShownDate(`${startDate} 〰️ ${endDate}`);
      setDateStyle("text-2xl");
    }
  }, [selectedDateRange]);

  return (
    <div
      className={`pb-6 font-bold text-neutral-700 ${dateStyle}`}
      onClick={openModal}
    >
      {shownDate}
    </div>
  );
}

export default DateSelector;
