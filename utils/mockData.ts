import { IExpense } from "../interfaces/expense";

interface GroupedExpenses {
  date: string;
  expenses: IExpense[];
}

export function generateMockData(
  numGroups: number,
  numExpensesPerGroup: number
): GroupedExpenses[] {
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds

  const mockData: GroupedExpenses[] = [];

  for (let i = 0; i < numGroups; i++) {
    const groupDate = new Date(currentDate.getTime() - i * oneDay)
      .toISOString()
      .substring(0, 10); // format date as YYYY-MM-DD
    const expenses: IExpense[] = [];

    for (let j = 0; j < numExpensesPerGroup; j++) {
      const expense: IExpense = {
        id: `${i}-${j}`,
        description: `Expense ${j + 1}`,
        cost: `${Math.floor(Math.random() * 1000)}.0`,
        category: {
          id: Math.floor(Math.random() * 10) + 1,
          name: "Category " + (Math.floor(Math.random() * 5) + 1),
        },
        date: groupDate,
      };

      expenses.push(expense);
    }

    const groupedExpenses: GroupedExpenses = {
      date: groupDate,
      expenses,
    };

    mockData.push(groupedExpenses);
  }

  return mockData;
}

export function generateMockData2(
  numGroups: number,
  numExpensesPerGroup: number
) {
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds

  const mockData = [];

  for (let i = 0; i < numGroups; i++) {
    const groupCat = "Category " + (Math.floor(Math.random() * 5) + 1); // format date as YYYY-MM-DD
    const expenses = [];

    for (let j = 0; j < numExpensesPerGroup; j++) {
      const expense = {
        id: `${i}-${j}`,
        description: `Expense ${j + 1}`,
        cost: `${Math.floor(Math.random() * 1000)}.0`,
        category: {
          name: groupCat,
        },
        date: new Date(
          currentDate.getTime() - Math.floor(Math.random() * 5) * oneDay
        )
          .toISOString()
          .substring(0, 10),
      };

      expenses.push(expense);
    }

    const groupedExpenses = {
      category: groupCat,
      expenses,
    };

    mockData.push(groupedExpenses);
  }

  return mockData;
}
