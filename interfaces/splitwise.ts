export interface IUser {
  id: number;
  name: string;
  icon: string;
}

export interface ICategory {
  id: number;
  name: string;
  icon: string;
  color?: string;
  parent: number;
}

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
