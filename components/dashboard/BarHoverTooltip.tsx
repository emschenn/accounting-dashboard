import { useState } from "react";

import useMousePosition from "../../hooks/useMousePosition";
import { IExpense } from "../../interfaces/expense";

type Props = {
  data: IExpense[];
  show: boolean;
};

function BarHoverTooltip({ data, show }: Props) {
  // const [tooltipContent, setTooltipContent] = useState([]);
  const { x: mouseX, y: mouseY } = useMousePosition();
  return show ? (
    <div
      className="fixed z-50 bg-red-100"
      style={{
        left: (mouseX ?? 0) + 10,
        top: (mouseY ?? 0) + 40,
      }}
    >
      {data.map(({ id, description }) => (
        <div key={id}>{description}</div>
      ))}
    </div>
  ) : (
    <></>
  );
}

export default BarHoverTooltip;
