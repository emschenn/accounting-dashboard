import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useState } from "react";

import DateSelector from "./DateSelector";

type Props = {
  selectedDateRange: { start: string; end: string };
  setSelectedDateRange: (value: { start: string; end: string }) => void;
};

function DataSelectModal({ selectedDateRange, setSelectedDateRange }: Props) {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<"month" | "range" | null>();
  const [tmpSelectedDateRange, setTmpSelectedDateRange] = useState<{
    start: string;
    end: string;
  }>(selectedDateRange);

  function closeModal() {
    setSelectedType(null);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <DateSelector
        openModal={openModal}
        selectedDateRange={selectedDateRange}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black bg-opacity-40 "
            onClick={closeModal}
          >
            <motion.div
              initial={{ top: -100 }}
              exit={{ top: -100 }}
              animate={{ top: -40 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 z-20 flex w-full flex-col gap-y-4 text-white"
            >
              <svg width="100%" height="210" viewBox="0 0 551 296">
                <path
                  className="fill-custom-red"
                  d="M0 176.951V0H551V146.617C514.715 183.117 461.436 210.174 393.592 223.372C279.067 245.652 137.5 217.896 0.254362 177.027C0.169584 177.002 0.0847964 176.977 0 176.951Z"
                />
              </svg>
              <div className="absolute inset-4 top-20">
                <div className="flex flex-row items-center justify-center gap-x-12 text-center text-sm">
                  <div
                    className={
                      selectedType === "month" ? "opacity-100" : " opacity-80"
                    }
                    onClick={() => {
                      if (selectedType === "month") setSelectedType(null);
                      else setSelectedType("month");
                    }}
                  >
                    Pick a month
                  </div>
                  <div
                    className={
                      selectedType === "range" ? "opacity-100" : " opacity-80"
                    }
                    onClick={() => {
                      if (selectedType === "range") setSelectedType(null);
                      else setSelectedType("range");
                    }}
                  >
                    Choose a range
                  </div>
                </div>
              </div>
            </motion.div>
            <AnimatePresence>
              {selectedType && (
                <motion.div
                  initial={{ top: -200 }}
                  exit={{ top: -200 }}
                  animate={{ top: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-0 z-10 flex h-96 w-full flex-col gap-y-4  text-white"
                >
                  <svg width="100%" height="320" viewBox="0 0 551 442">
                    <path
                      d="M551 329.682C543.426 337.768 535.072 345.324 525.836 352.261C480.584 386.247 423.357 383.05 364.925 379.785C339.763 378.38 314.378 376.962 289.629 378.495C262.574 380.17 235.142 385.429 207.953 390.642C146.1 402.499 85.5049 414.116 33.4663 382.758C21.5178 375.558 10.3639 367.451 0 358.57L0 0H551V329.682Z"
                      className="fill-custom-beige"
                    />
                  </svg>
                  <div className="absolute inset-4 top-40">
                    {selectedType === "month" ? (
                      <div>
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
                          className="border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 mb-6 block  w-full rounded-lg  border p-2.5 text-sm dark:text-white "
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          onChange={(e) => {
                            setTmpSelectedDateRange({
                              ...selectedDateRange,
                              start: e.target.value,
                            });
                          }}
                          value={tmpSelectedDateRange.start}
                          type="date"
                          className="border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 block w-full  flex-2 rounded-lg  border p-2.5 text-sm dark:text-white"
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
                          className="border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 block w-full  flex-2 rounded-lg  border p-2.5 text-sm dark:text-white"
                          placeholder="Select date"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {selectedType &&
              (tmpSelectedDateRange.start !== selectedDateRange.start ||
                tmpSelectedDateRange.end !== selectedDateRange.end) && (
                <div className="absolute left-[50%] bottom-32 -translate-x-[50%] text-[44px]">
                  {/* <div className=" flex h-20 w-20 items-center justify-center rounded-full bg-custom-red text-white"> */}
                  👌🏼
                  {/* </div> */}
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DataSelectModal;
