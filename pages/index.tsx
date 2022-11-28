import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { UserCircleIcon, BarsArrowUpIcon } from "@heroicons/react/24/solid";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

import useExpenses from "./hooks/useExpenses";
import { getCurrentDate } from "./utils/getCurrentDate";

import Expense from "./components/Expense";
import Selector from "./components/Selector";
import MonthSelector from "./components/MonthSelector";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const { data, isLoading, isError } = useExpenses();
  const [user, setUser] = useState<string>("All");
  const [cat, setCat] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Date");
  // const [selecteduser, setSelecteduser] = useState(people[0]);

  return (
    <main className="m-auto h-full w-full  md:w-1/2">
      {isLoading || !data?.expenses ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : (
        <>
          <div className=" p-2">
            <div className="px-2 pt-6">
              <MonthSelector />
            </div>
            <div className="flex gap-x-3 px-2 pb-6">
              <Selector
                icon={<UserCircleIcon />}
                data={["All", ...data!.users]}
                selected={user}
                setSelected={setUser}
              />
              <Selector
                icon={<Squares2X2Icon />}
                data={["All", ...data!.cats]}
                selected={cat}
                setSelected={setCat}
              />
              <Selector
                icon={<BarsArrowUpIcon />}
                data={["Date", "Money"]}
                selected={sortBy}
                setSelected={setSortBy}
              />
            </div>
            <div className="pb-24">
              {data!.expenses
                .sort((a, b) => {
                  if (sortBy === "Money") return +b.cost - +a.cost;
                  else return a.date < b.date ? 1 : -1;
                })
                .filter((d) => {
                  if (user === "All") return true;
                  const users = d.users.map(({ name }) => name);
                  if (users.includes(user)) return true;
                  return false;
                })
                .filter((d) => {
                  if (cat === "All") return true;
                  if (d.category.name === cat) return true;
                  return false;
                })
                .map((d) => (
                  <Expense key={d.id} data={d} user={user} />
                ))}
            </div>
          </div>
          <div className="fixed bottom-0 w-inherit ">
            <Dashboard data={data.expenses} user={user} />
          </div>
        </>
      )}
    </main>
  );
}
