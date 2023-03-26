import React from "react";

import { IExpense } from "../../interfaces/expense";
import Icon from "../Icon";

type Props = {
  expense: IExpense;
  selectedUser: string;
};

const ExpenseItem = ({ expense, selectedUser }: Props) => {
  return (
    <div className="flex items-start justify-between border-b border-neutral-300 bg-white p-4">
      <div className="flex items-start gap-x-2">
        <div className="font-medium   text-neutral-400">
          {new Date(expense.date).getDate()}
        </div>
        <div className="pt-0.5">
          <Icon
            isRounded={false}
            name={expense.subCategory.name}
            img={"Home.png"}
          />
        </div>

        <div>{expense.description}</div>
      </div>
      <div className="flex shrink-0 items-center gap-x-2 pl-4">
        <div className="flex flex-row gap-x-1">
          {/* {user === "All"
            ?  */}
          {expense.users.map((u) => (
            <Icon isRounded={true} key={u.name} name={u.name} img={u.icon} />
          ))}
          {/* : expense.users
                .filter((u) => u.name === user)
                .map((u) => (
                  <Avatar key={u.name} name={u.name} img={u.picture} />
                ))} */}
        </div>
        <div className="text-md font-medium">
          <span className="pr-0.5 font-light">$</span>
          {selectedUser === "All" || expense.users.length === 1 ? (
            expense.cost
          ) : (
            <span className="text-grass">
              {expense.users.filter((u) => u.name === selectedUser)[0].share}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
