import { useState, useEffect } from "react";

import { IExpense } from "../interfaces/expense";
import { ICategory } from "../interfaces/category";
import { IUser } from "../interfaces/user";

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
            categories.push({ id, name, icon, parent: -1 });
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
              const subCat = categories.filter((c) => c.id === category.id)[0];
              const cat = categories.filter((c) => c.id === subCat.parent)[0];
              return {
                id,
                category: {
                  id: cat.id,
                  icon: cat.icon,
                  name: cat.name,
                },
                subCategory: {
                  id: subCat.id,
                  icon: subCat.icon,
                  name: subCat.name,
                },
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

      //   fetch(url + "api/expenses")
      //     .then((res) => res.json())
      //     .then((data) => {
      //       const expenses: IResponseOfExpenses[] = data.expenses;
      //       return expenses
      //         .filter((e) => e.deleted_at === null)
      //         .map(({ id, category, description, cost, date, users }) => ({
      //           id,
      //           categoryId: getCategoriesBySub(category.id).id,
      //           subCategoryId: category.id,
      //           description,
      //           cost,
      //           date,
      //           users: users.map((u) => ({
      //             name: u.user.first_name,
      //             picture: u.user.picture.medium,
      //             share: u.owed_share,
      //           })),
      //         }));
      //     })
      //     .then((data) => {
      //       const users: string[] = [];
      //       data.forEach((d) => {
      //         d.users.forEach((u) => {
      //           if (!users.includes(u.name)) users.push(u.name);
      //         });
      //       });
      //       setData({
      //         expenses: data,
      //         users,
      //       });
      //       setIsLoading(false);
      //     })
      //     .catch((error) => {
      //       setIsError(true);
      //       setIsLoading(false);
      //       console.error(error);
      //     });
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export default useExpenses;
