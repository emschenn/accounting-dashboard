import { ICategory, IExpense } from "../interfaces/splitwise";
import { formatDate } from "./dateUtils";

type key = "category" | "date" | "subCategory";

type ExpenseGroup = Partial<Record<key, string>> & {
  expenses: IExpense[];
};

export function groupExpensesByDate(
  data: IExpense[],
  dateRange: {
    start: string;
    end: string;
  }
): ExpenseGroup[] {
  const entriesByDate = new Map<string, IExpense[]>();

  for (const entry of data) {
    const dateString = formatDate(entry.date);
    const dateEntries = entriesByDate.get(dateString) || [];
    dateEntries.push(entry);
    entriesByDate.set(dateString, dateEntries);
  }

  const { start, end } = dateRange;
  const startDate = new Date(start);
  const endDate = new Date(end);

  const result: ExpenseGroup[] = [];

  for (
    let date = startDate.getTime();
    date <= endDate.getTime();
    date += 86400000
  ) {
    const dateString = formatDate(date);
    const expenseEntries = entriesByDate.get(dateString) || [];
    result.push({
      date: dateString,
      expenses: expenseEntries,
    });
  }

  return result;
}

export function groupExpensesByCategory(expenses: IExpense[]): ExpenseGroup[] {
  const groupedExpenses: Record<string, ExpenseGroup> = {};
  expenses.forEach((expense) => {
    const cat = expense.category.name;
    if (!groupedExpenses[cat]) {
      groupedExpenses[cat] = { category: cat, expenses: [] };
    }
    groupedExpenses[cat].expenses.push(expense);
  });
  return Object.values(groupedExpenses);
}

export function groupExpensesBySubCategory(
  expenses: IExpense[]
): ExpenseGroup[] {
  const groupedExpenses: Record<string, ExpenseGroup> = {};
  expenses.forEach((expense) => {
    const cat = expense.subCategory.name;
    if (!groupedExpenses[cat]) {
      groupedExpenses[cat] = { subCategory: cat, expenses: [] };
    }
    groupedExpenses[cat].expenses.push(expense);
  });
  return Object.values(groupedExpenses);
}
