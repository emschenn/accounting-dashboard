import { ICategory } from "../interfaces/category";

export function getCategoriesById(
  categories: ICategory[],
  id: number
): ICategory {
  let cat = categories.filter((c) => c.id === id)[0];
  return cat;
}
