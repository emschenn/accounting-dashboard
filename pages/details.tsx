import { sum } from "d3-array";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";

import ExpenseItem from "../components/dashboard/ExpenseItem";
import Selector from "../components/dashboard/Selector";
import StackedBarChart from "../components/dashboard/StackedBarChart";
import DataSelectModal from "../components/DateSelectModal";
import DateSelector from "../components/DateSelectModal/DateSelector";
import Layout from "../components/Layout";
import { useSplitwiseContext } from "../contexts";
import { IExpense } from "../interfaces/expense";
import { groupExpensesByDate } from "../utils/expensesUtils";
import { formatNumber } from "../utils/formatNumber";

function InlineHr() {
  return <hr className="scale-y-[0.1] border-[1px] border-black" />;
}

type RowProps = {
  data: {
    title: string | JSX.Element;
    content?: string | JSX.Element;
    isCost?: boolean;
  }[];
};

function Row({ data }: RowProps) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 text-xs font-medium">
        {data.map(({ title }, i) => (
          <div key={i} className={`${i === 0 ? "text-start" : "text-end"}`}>
            {title}
          </div>
        ))}
      </div>
      <InlineHr />
      <div className="grid grid-cols-2 text-xl font-semibold">
        {data.map(({ title, content, isCost = false }, i) => (
          <div
            key={`${title}-${content}`}
            className={`${i === 0 ? "text-start" : "text-end"}`}
          >
            {isCost && <span className="mr-1 text-base font-light">$</span>}
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}

const ALL_CATEGORIES = "All Categories";
const ALL_USERS = "Both";

function Details() {
  const { data: d, isLoading, isError } = useSplitwiseContext();

  const [selectedDateRange, setSelectedDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: `${new Date().toISOString().slice(0, 8)}01`,
    end: new Date().toISOString().slice(0, 10),
  });
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_CATEGORIES);
  const [selectedUser, setSelectedUser] = useState<string>(ALL_USERS);
  const [selectedSortBy, setSelectedSortBy] = useState<
    "latest" | "oldest" | "most expensive" | "cheapest"
  >("latest");
  const [selectedExpenses, setSelectedExpenses] = useState<IExpense[]>();

  const [showChart, setShowChart] = useState<"bar" | "donut" | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const data = useMemo(
    () =>
      d?.expenses
        .filter((e) => {
          let userFilter = true,
            catFilter = true,
            dataFilter;
          const { start, end } = selectedDateRange;
          const startDate = new Date(start).setHours(0, 0, 0, 0);
          const endDate = new Date(end).setHours(0, 0, 0, 0);
          const date = new Date(e.date).setHours(0, 0, 0, 0);
          dataFilter = date <= endDate && date >= startDate;
          if (selectedUser !== ALL_USERS) {
            const users = e.users.map(({ name }) => name);
            userFilter = users.includes(selectedUser);
          }
          if (selectedCategory !== ALL_CATEGORIES) {
            catFilter = e.category.name === selectedCategory;
          }
          return dataFilter && userFilter && catFilter;
        })
        .map((e) => {
          if (selectedUser !== ALL_USERS) {
            return {
              ...e,
              cost: e.users.filter((u) => u.name === selectedUser)[0].share,
            };
          }
          return e;
        }),
    [d?.expenses, selectedDateRange, selectedUser, selectedCategory]
  );

  const totalCost = useMemo(() => {
    if (!data) return null;
    const costArray = data.map(({ cost }) => +cost);
    return sum(costArray);
  }, [data]);

  const categories = useMemo(
    () => d?.categories.filter(({ parent }) => parent === -1),
    [d]
  );

  if (isLoading)
    return (
      <Layout bgColor="bg-custom-red">
        <div>loading</div>
      </Layout>
    );
  if (isError) return <div>error</div>;

  return (
    <Layout>
      <div className="w-full text-end font-krona text-lg leading-5">
        {/* {getMonthAbbreviation(selectedDateRange.start).toUpperCase()} */}
        <DataSelectModal
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
        />
      </div>
      <hr className="border-2 border-black" />
      <div className="my-2 text-5xl font-bold">
        <span className="mr-2 scale-75 font-light">$</span>
        {formatNumber(totalCost) ?? "..."}
      </div>
      <Row
        data={[
          {
            title: "Category",
            content: (
              <Selector
                selectedOption={selectedCategory}
                setSelectedOption={(s) => setSelectedCategory(s)}
                options={[
                  ALL_CATEGORIES,
                  ...(categories?.map(({ name }) => name) ?? []),
                ]}
              />
            ),
          },
          {
            title: "Owner",
            content: (
              <Selector
                selectedOption={selectedUser}
                setSelectedOption={(s) => setSelectedUser(s)}
                options={[ALL_USERS, "Eric", "Emily"]}
              />
            ),
          },
        ]}
      />
      <motion.div
        className={`mt-4 grid grid-cols-2  gap-x-1.5`}
        animate={{ height: showChart ? 28 : 72 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="cursor-pointer rounded-lg bg-red-300 bg-[url('/svg/donut.svg')] bg-cover bg-center"
          onClick={() => setShowChart("bar")}
        />
        <div
          className="cursor-pointer rounded-lg bg-red-300 bg-[url('/svg/donut.svg')] bg-cover bg-center"
          onClick={() => setShowChart("donut")}
        />
      </motion.div>
      <AnimatePresence>
        {showChart ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white"
          >
            <div className="mt-2 flex justify-between text-sm italic ">
              <div
                className="font-light"
                onClick={() => {
                  setAnimationKey((k) => ++k);
                }}
              >
                View all
              </div>
              <div
                className="font-light"
                onClick={() => {
                  setShowChart(null);
                  setSelectedExpenses(undefined);
                }}
              >
                Close
              </div>
            </div>
            {showChart === "bar" ? (
              <div className="relative my-2 h-[300px] w-full overflow-x-auto overflow-y-hidden">
                {d && data ? (
                  <StackedBarChart
                    animationKey={animationKey}
                    data={groupExpensesByDate(data, selectedDateRange)}
                    cats={categories}
                    setSelectedExpenses={setSelectedExpenses}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            ) : (
              <></>
            )}
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <div className="mt-4 text-base ">
        <div className="flex justify-between text-xs font-medium">
          <div
            onClick={() => {
              if (selectedSortBy === "latest") setSelectedSortBy("oldest");
              else setSelectedSortBy("latest");
            }}
          >
            Date
            {selectedSortBy === "latest" && <span> ▼</span>}
            {selectedSortBy === "oldest" && <span> ▲</span>}
          </div>
          <div
            onClick={() => {
              if (selectedSortBy === "most expensive")
                setSelectedSortBy("cheapest");
              else setSelectedSortBy("most expensive");
            }}
          >
            {selectedSortBy === "most expensive" && <span>▼ </span>}
            {selectedSortBy === "cheapest" && <span>▲ </span>}
            Cost
          </div>
        </div>
        <InlineHr />
        {(function renderList() {
          const d = selectedExpenses
            ? [...selectedExpenses]
            : data
            ? [...data]
            : [];
          return d
            .filter(({ cost }) => +cost > 0)
            .sort((a, b) => {
              if (selectedSortBy === "latest") return a.date < b.date ? 1 : -1;
              if (selectedSortBy === "oldest") return a.date > b.date ? 1 : -1;
              if (selectedSortBy === "cheapest") return +a.cost - +b.cost;
              return +b.cost - +a.cost;
            })
            .map((d) => (
              <ExpenseItem key={d.id} expense={d} selectedUser={selectedUser} />
            ));
        })()}
      </div>
    </Layout>
  );
}

export default Details;
