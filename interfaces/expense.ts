import { ICategory } from "./category";

export interface IExpense {
  id: number;
  category: ICategory;
  subCategory: ICategory;
  description: string;
  cost: string;
  date: string;
  users: {
    name: string;
    icon: string;
    share: string;
  }[];
}
