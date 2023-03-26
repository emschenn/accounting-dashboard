import { createContext, useEffect, useState } from "react";

import { ICategory } from "../interfaces/category";
import { IExpense } from "../interfaces/expense";
import { IUser } from "../interfaces/user";

interface ISplitwiseContextProps {
  data: IData | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface IResponseOfGroup {
  members: {
    id: number;
    first_name: string;
    last_name: string;
    picture: { medium: string };
  }[];
}

interface IResponseOfCategories {
  id: number;
  name: string;
  icon: string;
  subcategories: {
    id: number;
    name: string;
    icon: string;
  }[];
}

interface IResponseOfExpenses
  extends Omit<IExpense, "users" | "category" | "subCategory"> {
  users: {
    user: {
      first_name: string;
      picture: { medium: string };
    };
    owed_share: string;
  }[];
  deleted_at: string | null;
  category: { name: string; id: number };
}

interface IData {
  expenses: IExpense[];
  users: IUser[];
  categories: ICategory[];
}

export const SplitwiseContext = createContext<ISplitwiseContextProps>({
  data: undefined,
  isLoading: false,
  isError: false,
});

const categoryColor: Record<string, string> = {
  Utilities: "#A4C0D9",
  Uncategorized: "#D8D8D0",
  Entertainment: "#D08DAD",
  "Food and drink": "#78A390",
  Home: "#EAB840",
  Life: "#C55A34",
  Transportation: "#2B4427",
};

export const SplitwiseContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [data, setData] = useState<IData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      const url =
        process.env.NODE_ENV === "production"
          ? "https://dollarsdollars.vercel.app/"
          : "http://localhost:3000/";

      const endpoint = ["api/expenses", "api/group", "api/categories"];

      Promise.all(endpoint.map((endpoint) => fetch(url + endpoint)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((responses) => {
          let responseExpenses: IResponseOfExpenses[];
          let responseGroup: IResponseOfGroup;
          let responseCategories: IResponseOfCategories[];
          [
            { expenses: responseExpenses },
            { group: responseGroup },
            { categories: responseCategories },
          ] = responses;

          const categories: ICategory[] = [];
          responseCategories.forEach(({ id, name, icon, subcategories }) => {
            let parentId = id;
            categories.push({
              id,
              name,
              icon,
              color: categoryColor[name],
              parent: -1,
            });
            categories.push(
              ...subcategories.map(({ id, name, icon }) => ({
                id,
                name,
                icon,
                parent: parentId,
              }))
            );
          });

          const expenses: IExpense[] = responseExpenses
            .filter((e) => e.deleted_at === null)
            .map(({ id, category, description, cost, date, users }) => {
              const subCat: ICategory = categories.filter(
                (c) => c.id === category.id
              )[0];
              const cat: ICategory = categories.filter(
                (c) => c.id === subCat.parent
              )[0];
              return {
                id,
                category: cat,
                subCategory: subCat,
                description,
                cost,
                date,
                users: users.map((u) => ({
                  name: u.user.first_name,
                  icon: u.user.picture.medium,
                  share: u.owed_share,
                })),
              };
            });

          const users: IUser[] = responseGroup.members.map((u) => ({
            id: u.id,
            name: u.first_name,
            icon: u.picture.medium,
          }));

          setData({
            expenses,
            users,
            categories,
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

  return (
    <SplitwiseContext.Provider
      value={{
        data,
        isLoading,
        isError,
      }}
    >
      {children}
    </SplitwiseContext.Provider>
  );
};
