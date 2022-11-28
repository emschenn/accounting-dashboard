export interface IExpense {
  id: number;
  category: {
    id: number;
    name: string;
  };
  description: string;
  cost: string;
  date: string;
  users: {
    name: string;
    picture: string;
    share: string;
  }[];
}
