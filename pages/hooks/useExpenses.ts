import { useState, useEffect } from "react";

import { IExpense } from "../interfaces/expense";

interface IUser {
  user: {
    first_name: string;
    picture: { medium: string };
  };
  owed_share: string;
}

interface IFullExpense extends Omit<IExpense, "users"> {
  users: IUser[];
  deleted_at: string | null;
}

interface IData {
  expenses: IExpense[];
  users: string[];
  cats: string[];
}

const useExpenses = () => {
  const [data, setData] = useState<IData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      const url =
        process.env.NODE_ENV === "production"
          ? "https://accounting-dashboard.vercel.app/"
          : "http://localhost:3000/";

      fetch(url + "api/expenses")
        .then((res) => res.json())
        .then((data) => {
          const expenses: IFullExpense[] = data.expenses;
          return expenses
            .filter((e) => e.deleted_at === null)
            .map(({ id, category, description, cost, date, users }) => ({
              id,
              category,
              description,
              cost,
              date,
              users: users.map((u) => ({
                name: u.user.first_name,
                picture: u.user.picture.medium,
                share: u.owed_share,
              })),
            }));
        })
        .then((data) => {
          const users: string[] = [],
            cats: string[] = [];
          data.forEach((d) => {
            if (!cats.includes(d.category.name)) cats.push(d.category.name);
            d.users.forEach((u) => {
              if (!users.includes(u.name)) users.push(u.name);
            });
          });
          setData({
            expenses: data,
            users,
            cats,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(true);
          setIsLoading(false);
          console.error(error);
        });
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export default useExpenses;
