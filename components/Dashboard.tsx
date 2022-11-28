import React from "react";
import { IExpense } from "../interfaces/expense";

type Props = {
  data: IExpense[];
  user: string;
};

function Dashboard({ data, user }: Props) {
  function calculateTotal() {
    return data.reduce((acc, curr) => {
      if (user === "All") {
        return +acc + +curr.cost;
      }
      let u = curr.users.filter((u) => u.name === user)[0];
      if (u) return +acc + +u.share;
      return acc;
    }, 0);
  }

  return (
    <div className="rounded-t-2xl bg-white text-black shadow-2xl">
      <div className="flex items-end justify-end gap-x-4 px-8 py-6">
        Total:{" "}
        <span className="text-2xl font-semibold">{calculateTotal()}</span>
      </div>
    </div>
  );
}

export default Dashboard;
