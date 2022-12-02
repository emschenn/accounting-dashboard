import React, { useState, useEffect } from "react";
import { IExpense } from "../../interfaces/expense";
import { ChevronUpIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import PieChart from "./PieChart";

type Props = {
  data: IExpense[];
  selectedUser: string;
  selectedCat: string;
};

function Dashboard({ data, selectedUser, selectedCat }: Props) {
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let c = data.reduce((acc, curr) => {
      if (selectedUser === "All") return +acc + +curr.cost;
      let u = curr.users.filter((u) => u.name === selectedUser)[0];
      return +acc + +(u?.share || 0);
    }, 0);
    setCalculatedTotal(c);
  }, [data, selectedUser]);

  return (
    <div
      className={`shadow-topp m-auto flex flex-col gap-y-6 rounded-t-2xl bg-splitwise-dark px-5 py-4 text-white transition-all ease-in-out md:w-1/2 ${
        isOpen ? "max-h-96" : "max-h-16"
      }`}
    >
      <div
        className="flex items-end justify-between"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <ChevronUpIcon
          className={`mr-5 h-6 w-6 rotate-180 stroke-2 transition-all ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
        <div className="flex items-end justify-end gap-x-3 ">
          Total:
          <span className="text-2xl font-semibold">
            <span className="pr-0.5 font-light">$</span>
            {calculatedTotal}
          </span>
        </div>
      </div>
      <div className="mb-3 flex flex-col rounded-md bg-white px-4 py-4 text-black">
        <div className="h-60 w-auto">
          <PieChart
            data={data}
            selectedUser={selectedUser}
            selectedCat={selectedCat}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
