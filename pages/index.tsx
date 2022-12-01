import { useState, useEffect } from "react";
import Head from "next/head";
import { UserCircleIcon, BarsArrowUpIcon } from "@heroicons/react/24/solid";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

import useData from "../hooks/useData";

import Selector from "../components/Selector";
import MonthSelector from "../components/MonthSelector";
import Expenses from "../components/Expenses/";

type SelectorData = {
  id: number;
  name: string;
};

export default function Home() {
  const { data, isLoading, isError } = useData();
  const defaultData = { name: "All", id: 0 };
  const sortByData = [
    { name: "Date", id: 0 },
    { name: "Money", id: 1 },
  ];

  const [user, setUser] = useState<SelectorData>(defaultData);
  const [cat, setCat] = useState<SelectorData>(defaultData);
  const [sortBy, setSortBy] = useState<SelectorData>(sortByData[0]);

  return (
    <>
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>$$$</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="m-auto h-full w-full  font-satoshi md:w-1/2">
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
                  data={[defaultData, ...data.users]}
                  selected={user}
                  setSelected={setUser}
                />
                <Selector
                  icon={<Squares2X2Icon />}
                  data={[
                    defaultData,
                    ...data.categories.filter((c) => c.parent === -1),
                  ]}
                  selected={cat}
                  setSelected={setCat}
                />
                <Selector
                  icon={<BarsArrowUpIcon />}
                  data={sortByData}
                  selected={sortBy}
                  setSelected={setSortBy}
                />
              </div>
              {/* <div className="pb-24"> */}
              <Expenses
                expenses={data.expenses}
                chosenSortBy={sortBy.name}
                chosenUser={user.name}
                chosenCat={cat.name}
              />
              {/* </div> */}
            </div>
          </>
        )}
      </main>
    </>
  );
}
