import React, { useState, useEffect } from "react";

import { IExpense } from "../../interfaces/expense";
import ExpenseItem from "./ExpenseItem";
import Dashboard from "./Dashboard";

type Props = {
  expenses: IExpense[];
  chosenSortBy: string;
  chosenUser: string;
  chosenCat: string;
};

function Expenses({ expenses, chosenSortBy, chosenUser, chosenCat }: Props) {
  const [processedData, setProcessedData] = useState<IExpense[]>([]);

  useEffect(() => {
    let d = expenses
      .sort((a, b) => {
        if (chosenSortBy === "Money") return +b.cost - +a.cost;
        else return a.date < b.date ? 1 : -1;
      })
      .filter((d) => {
        if (chosenUser === "All") return true;
        const users = d.users.map(({ name }) => name);
        if (users.includes(chosenUser)) return true;
        return false;
      })
      .filter((d) => {
        if (chosenCat === "All") return true;
        if (d.category.name === chosenCat) return true;
        return false;
      });

    setProcessedData(d);
  }, [chosenCat, chosenSortBy, chosenUser, expenses]);

  return (
    <div>
      <div className="pb-24">
        {processedData.map((d) => (
          <ExpenseItem key={d.id} expense={d} chosenUser={chosenUser} />
        ))}
      </div>
      <div className="fixed bottom-0 right-3 ">
        <Dashboard data={processedData} user={chosenUser} />
      </div>
    </div>
  );
}

export default Expenses;
