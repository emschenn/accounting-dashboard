import React from "react";

import { IExpense } from "../interfaces/expense";
import { cat2EmojiTable } from "../config/cat2EmojiTable";
import Avatar from "./Avatar";

type Props = {
  data: IExpense;
  user: string;
};

const Expense = ({ data, user }: Props) => {
  return (
    <div className="flex justify-between p-4 border-b border-neutral-300 bg-white">
      <div className="flex gap-x-2">
        <div className="font-light  text-neutral-500">
          {new Date(data.date).getDate()}
        </div>
        <div>{cat2EmojiTable[data.category.name] ?? "⚪️"}</div>
        <div>{data.description}</div>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="flex flex-row gap-x-1">
          {/* {user === "All"
            ?  */}
          {data.users.map((u) => (
            <Avatar key={u.name} name={u.name} img={u.picture} />
          ))}
          {/* : data.users
                .filter((u) => u.name === user)
                .map((u) => (
                  <Avatar key={u.name} name={u.name} img={u.picture} />
                ))} */}
        </div>
        <div className="text-md">
          <span className="">$ </span>
          {user === "All" || data.users.length === 1 ? (
            data.cost
          ) : (
            <span className="text-grass">
              {data.users.filter((u) => u.name === user)[0].share}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expense;
