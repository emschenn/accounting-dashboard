import { IExpense } from "../../interfaces/expense";
import Icon from "../Icon";

type Props = {
  expense: IExpense;
  selectedUser: string;
};

const ExpenseItem = ({ expense, selectedUser }: Props) => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-300 py-2.5">
      <div className="flex items-center gap-x-2">
        <div className="w-5 text-center font-satoshi text-lg font-light text-black">
          {new Date(expense.date).getDate()}
        </div>
        <div className="pt-0.5">
          {/* <Icon
            isRounded={false}
            name={expense.subCategory.name}
            img={`/icon/${expense.category.name}.png`}
          /> */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="100%"
              height="100%"
              rx="2"
              fill={expense.category.color}
            />
          </svg>
        </div>

        <div>{expense.description}</div>
      </div>
      <div className="flex shrink-0 items-center gap-x-2 pl-4">
        <div className="text-xl font-medium">
          <span className="mr-0.5 text-base font-light">$</span>
          <span
            className={`${
              selectedUser === "Both" || expense.users.length === 1
                ? ""
                : "opacity-50"
            }`}
          >
            {Math.round(+expense.cost)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
