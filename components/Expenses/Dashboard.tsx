import React, { useState, useEffect } from "react";
import { IExpense } from "../../interfaces/expense";
import { ChevronUpIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  data: IExpense[];
  user: string;
};

function Dashboard({ data, user }: Props) {
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let c = data.reduce((acc, curr) => {
      if (user === "All") return +acc + +curr.cost;
      let u = curr.users.filter((u) => u.name === user)[0];
      return +acc + +(u?.share || 0);
    }, 0);
    setCalculatedTotal(c);
  }, [data, user]);

  return (
    <div className="flex items-center justify-between rounded-t-2xl bg-splitwise-dark px-5 py-4 font-satoshi text-white shadow-top">
      {/* <ArrowUpCircleIcon /> */}
      <ChevronUpIcon className="mr-5 h-6 w-6 stroke-2" />
      <div className="flex items-end justify-end gap-x-3 ">
        Total:
        <span className="text-2xl font-semibold">
          <span className="pr-0.5 font-light">$</span>
          {calculatedTotal}
        </span>
      </div>
    </div>
  );
}

export default Dashboard;
