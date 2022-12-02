import React, { useState, useEffect } from "react";

import { IExpense } from "../../interfaces/expense";
import ExpenseItem from "./ExpenseItem";
import Dashboard from "./Dashboard";

type Props = {
  expenses: IExpense[];
  selectedSortBy: string;
  selectedUser: string;
  selectedCat: string;
};

function Expenses({
  expenses,
  selectedSortBy,
  selectedUser,
  selectedCat,
}: Props) {
  const [processedData, setProcessedData] = useState<IExpense[]>([]);

  useEffect(() => {
    let d = expenses
      .sort((a, b) => {
        if (selectedSortBy === "Money") return +b.cost - +a.cost;
        else return a.date < b.date ? 1 : -1;
      })
      .filter((d) => {
        if (selectedUser === "All") return true;
        const users = d.users.map(({ name }) => name);
        if (users.includes(selectedUser)) return true;
        return false;
      })
      .filter((d) => {
        if (selectedCat === "All") return true;
        if (d.category.name === selectedCat) return true;
        return false;
      })
      .map((d) => {
        if (selectedUser === "All") return d;
        return { ...d, users: d.users.filter((u) => u.name === selectedUser) };
      });

    setProcessedData(d);
    console.log(d);
  }, [selectedCat, selectedSortBy, selectedUser, expenses]);

  return (
    <div>
      <div className="pb-24">
        {processedData.map((d) => (
          <ExpenseItem key={d.id} expense={d} selectedUser={selectedUser} />
        ))}
      </div>
      <div className="fixed bottom-0 right-2 left-2 bg-gradient-to-t from-white via-white pt-12 ">
        <Dashboard
          data={processedData}
          selectedUser={selectedUser}
          selectedCat={selectedCat}
        />
      </div>
    </div>
  );
}

export default Expenses;
