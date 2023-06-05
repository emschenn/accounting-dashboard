import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import DateSelector from "./DateSelector";

type Props = {
  selectedDateRange: { start: string; end: string };
  setSelectedDateRange: (value: { start: string; end: string }) => void;
};

function DataSelectModal({ selectedDateRange, setSelectedDateRange }: Props) {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-10 h-full w-full bg-black bg-opacity-20 "
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: -100 }}
              exit={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ ease: "easeInOut", delay: 0.1, duration: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="z-20 m-1 flex w-auto gap-x-6 overflow-x-auto rounded-xl bg-custom-red px-8 py-4 font-krona text-white"
            >
              {monthAbbreviations.map((m, index) => {
                const date = new Date(selectedDateRange.start);
                const month = date.getMonth();

                return (
                  <div
                    key={m}
                    className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-lg  ${
                      month === index
                        ? "rounded-full bg-white text-custom-red"
                        : ""
                    }`}
                    onClick={() => {
                      const currentDate = new Date();
                      const start = new Date(
                        currentDate.getFullYear(),
                        index,
                        2
                      )
                        .toISOString()
                        .split("T")[0];
                      const end = new Date(
                        currentDate.getFullYear(),
                        index + 1,
                        1
                      )
                        .toISOString()
                        .split("T")[0];
                      setSelectedDateRange({ start, end });
                      closeModal();
                    }}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DataSelectModal;
