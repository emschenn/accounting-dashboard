import { max, sum } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";
import { stack } from "d3-shape";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";

import { getDateWithOrdinalNum } from "../../utils/dateUtils";
import { groupExpensesByCategory } from "../../utils/expensesUtils";

function StackedBarChart({ data, cats, animationKey, setSelectedExpenses }) {
  const barWidth = 60;
  const barPadding = 16;
  const height = 270;
  const marginX = 10;
  const marginY = 40;
  const [selectedBar, setSelectedBar] = useState(null);

  const maxCostInADay = useMemo(
    () => max(data.map((d) => sum(d.expenses.map(({ cost }) => +cost)) || 0)),
    [data]
  );

  const yAxis = useMemo(
    () => scaleLinear().domain([0, maxCostInADay]).range([height, 0]),
    [maxCostInADay]
  );

  const xScale = useMemo(
    () =>
      scaleBand()
        .domain(data.map((d) => d.date))
        .range([0, barWidth * data.length])
        .padding(0),
    [data]
  );

  const yScale = scaleLinear().domain([0, maxCostInADay]).range([height, 0]);

  const stackScale = useMemo(
    () =>
      stack()
        .keys(cats.map(({ name }) => name))
        .value((d, key) => {
          const cat = groupExpensesByCategory(d.expenses).find(
            ({ category }) => category === key
          );
          return cat ? sum(cat.expenses.map(({ cost }) => +cost)) : 0;
        }),
    [cats]
  );

  const stackedData = useMemo(() => {
    const d = stackScale(data);
    let transposedStack = [];
    for (var i = 0; i < d[0].length; i++) {
      transposedStack[i] = [];
      for (var j = 0; j < d.length; j++) {
        if (d[j][i][0] === d[j][i][1]) continue;
        transposedStack[i].push({
          ...d[j][i],
          cat: cats.map(({ name, color }) => ({ name, color }))[j],
        });
      }
    }
    return transposedStack;
  }, [cats, data, stackScale]);

  return (
    <>
      {/* <BarHoverTooltip show={tooltipOpened} data={selectedExpense} /> */}
      <div className="sticky left-0 h-full w-full">
        {yAxis
          .ticks()
          .slice(1)
          .map((tick, i) => (
            <div
              key={tick}
              style={{ top: +yAxis(tick).toFixed() - 10, right: 0 }}
              className={`absolute w-full text-xs text-[#aaa] ${
                i % 2 === 0 ? "text-end" : ""
              }`}
            >
              <svg width="100%" height="10px">
                <line
                  x1="0"
                  x2={barWidth * data.length}
                  y1={10}
                  y2={10}
                  stroke="#555"
                  stroke-dasharray="4"
                />
              </svg>
              <span className="translate-y-1 bg-white">
                {i + 1 === yAxis.ticks().length - 1 ? `${tick}+` : tick}
              </span>
            </div>
          ))}
      </div>
      <svg
        width={barWidth * data.length + marginX}
        height={height + marginY}
        className="absolute left-0 top-0 z-10 "
      >
        {stackedData.map((expensesInADay, i) => {
          const x = xScale(data[i].date) + marginX;
          const date = data[i].date;
          const day = date.split("/")[1];
          return (
            <g
              key={`date-${i}`}
              onClick={() => console.log("??s")}
              className={selectedBar === date ? "contrast-125" : ""}
            >
              {expensesInADay
                .sort((a, b) => a[1] - b[1])
                .map((e, j) => {
                  const y = yScale(e[1]);
                  const height = yScale(e[0]) - yScale(e[1]);
                  const isTopBar = j + 1 === expensesInADay.length;
                  const positionProp = {
                    x,
                    y,
                    height,
                    width: barWidth - barPadding,
                  };
                  return (
                    <>
                      {isTopBar && (
                        <motion.clipPath id={`clip-${i}-${j}`}>
                          <rect
                            {...positionProp}
                            height={height + 40}
                            rx="6"
                            ry="6"
                          />
                        </motion.clipPath>
                      )}
                      <motion.rect
                        {...positionProp}
                        className="cursor-pointer"
                        clip-path={isTopBar ? `url(#clip-${i}-${j})` : ""}
                        fill={e.cat.color}
                        initial={{ attrY: 500 }}
                        animate={{ attrY: y }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        key={`rect-${i}-${j}-${animationKey}`}
                        onClick={() => {
                          if (date === selectedBar) {
                            setSelectedBar(null);
                            setSelectedExpenses(undefined);
                            return;
                          }
                          setSelectedBar(date);
                          setSelectedExpenses(e.data.expenses);
                        }}
                      ></motion.rect>
                    </>
                  );
                })}
              <rect
                x={x}
                y={height}
                width="44"
                height="50"
                className="fill-custom-bg"
              />
              {day && (
                <text
                  x={x + 22}
                  textAnchor="middle"
                  y={height + 16}
                  key={day}
                  className="cursor-pointer bg-red-200 font-satoshi font-medium"
                  alignmentBaseline="middle"
                >
                  {day}
                  <tspan
                    className="ml-2 text-xs font-light"
                    alignmentBaseline="middle"
                    dx="0.15em"
                  >
                    {getDateWithOrdinalNum(day)}
                  </tspan>
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </>
  );
}

export default StackedBarChart;
