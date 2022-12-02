import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

type Props = {
  selectedDateRange: { start: string; end: string };
  setSelectedDateRange: (value: { start: string; end: string }) => void;
  closeModal: () => void;
};

const ModalContent = ({
  selectedDateRange,
  setSelectedDateRange,
  closeModal,
}: Props) => {
  const [selectedType, setSelectedType] = useState<"month" | "range" | null>();
  const [tmpSelectedDateRange, setTmpSelectedDateRange] = useState<{
    start: string;
    end: string;
  }>(selectedDateRange);

  return (
    <>
      <div className=" flex flex-col gap-y-4">
        <h1 className="pb-2 text-2xl font-medium text-splitwise-dark">
          Select Date
        </h1>
        <div className="flex flex-col gap-y-2">
          <h2
            className={`text-lg ${
              selectedType === "month" ? "font-medium" : "font-base"
            }`}
            onClick={() => {
              if (selectedType === "month") setSelectedType(null);
              else setSelectedType("month");
            }}
          >
            Choose a month
          </h2>
          {selectedType === "month" && (
            <input
              onChange={(e) => {
                let [year, month] = e.target.value.split("-");
                setTmpSelectedDateRange({
                  start: `${e.target.value}-01`,
                  end: `${e.target.value}-${new Date(
                    +year,
                    +month,
                    0
                  ).getDate()}`,
                });
              }}
              type="month"
              min="2022-10"
              value={tmpSelectedDateRange.start.slice(0, 7)}
              className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 "
            />
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <h2
            className={`text-lg ${
              selectedType === "range" ? "font-medium" : "font-base"
            }`}
            onClick={() => {
              if (selectedType === "range") setSelectedType(null);
              else setSelectedType("range");
            }}
          >
            Custom date range
          </h2>
          {/* </div> */}
          {selectedType === "range" && (
            <div className="mb-6 flex items-center gap-x-2">
              <input
                onChange={(e) => {
                  setTmpSelectedDateRange({
                    ...selectedDateRange,
                    start: e.target.value,
                  });
                }}
                value={tmpSelectedDateRange.start}
                type="date"
                className="block w-full flex-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Select date"
              />
              <div>-</div>
              <input
                onChange={(e) => {
                  setTmpSelectedDateRange({
                    ...selectedDateRange,
                    end: e.target.value,
                  });
                }}
                value={tmpSelectedDateRange.end}
                type="date"
                className="block w-full flex-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Select date"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-x-6">
        <button
          type="button"
          className="inline-flex justify-center rounded-lg border border-transparent bg-neutral-200 px-4 py-2 text-black hover:font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
          onClick={() => {
            closeModal();
            setSelectedDateRange(tmpSelectedDateRange);
          }}
        >
          Done
        </button>
      </div>
    </>
  );
};

export default ModalContent;
