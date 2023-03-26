import React, { useEffect, useState } from "react";

import { IExpense } from "../../interfaces/expense";
import Dashboard from "./Dashboard";
import ExpenseItem from "./ExpenseItem";

type Props = {
  expenses: IExpense[];
  selectedSortBy: string;
  selectedUser: string;
  selectedCat: string;
  selectedDateRange: { start: string; end: string };
};

function Expenses({
  expenses,
  selectedSortBy,
  selectedUser,
  selectedCat,
  selectedDateRange,
}: Props) {
  const [processedData, setProcessedData] = useState<IExpense[]>([]);

  useEffect(() => {
    let d = expenses
      .sort((a, b) => {
        if (selectedSortBy === "Money") return +b.cost - +a.cost;
        else return a.date < b.date ? 1 : -1;
      })
      .filter((d) => {
        const { start, end } = selectedDateRange;
        const startDate = new Date(start).setHours(0, 0, 0, 0);
        const endDate = new Date(end).setHours(0, 0, 0, 0);
        const date = new Date(d.date).setHours(0, 0, 0, 0);
        return date <= endDate && date >= startDate;
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
      });
    // .map((d) => {
    //   if (selectedUser === "All") return d;
    //   return { ...d, users: d.users.filter((u) => u.name === selectedUser) };
    // });

    setProcessedData(d);
  }, [selectedCat, selectedSortBy, selectedUser, expenses, selectedDateRange]);

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
