export interface IExpense {
  id: number;
  category: {
    id: number;
    icon: string;
    name: string;
  };
  subCategory: {
    id: number;
    icon: string;
    name: string;
  };
  description: string;
  cost: string;
  date: string;
  users: {
    name: string;
    icon: string;
    share: string;
  }[];
}
