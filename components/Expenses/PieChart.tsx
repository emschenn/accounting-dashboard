import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { animated } from "@react-spring/web";
import randomColor from "randomcolor";

import { IExpense } from "../../interfaces/expense";
import Icon from "../Icon";

type Props = {
  data: IExpense[];
  selectedUser: string;
  selectedCat: string;
};

interface IPieChartData {
  id: number;
  label: string;
  value: number;
  color?: string;
  icon?: string;
}

const colorConfig: { [k: string]: string } = {
  Entertainment: "#C7DAE6",
  "Food and drink": "#D7E5C5",
  Home: "#DFD5C5",
  Life: "#F4DDDB",
  Transportation: "#DECDE2",
  Uncategorized: "#E6E8ED",
  Utilities: "#E1C7BF",
};

function PieChart({ data, selectedUser, selectedCat }: Props) {
  const [pieChartData, setPieChartData] = useState<IPieChartData[]>([]);

  const c = randomColor({
    count: 10,
    hue: "green",
  });

  useEffect(() => {
    let pieData = data.reduce<{ [k: string]: IPieChartData }>((acc, curr) => {
      let cat = selectedCat === "All" ? curr.category : curr.subCategory;
      let cost =
        selectedUser === "All"
          ? +curr.cost
          : +curr.users.filter((u) => u.name === selectedUser)[0]?.share;
      if (cat.name in acc) acc[cat.name].value += cost;
      else {
        acc[cat.name] = {
          value: cost,
          id: cat.id,
          label: cat.name,
          icon: cat.icon,
        };
      }
      return acc;
    }, {});

    if (selectedCat === "All") {
      Object.entries(colorConfig).forEach((c) => {
        let [key, color] = c;
        if (pieData[key]) pieData[key] = { ...pieData[key], color };
      });
    } else {
      const colors = randomColor({
        count: Object.keys(pieData).length,
        luminosity: "light",
        hue: colorConfig[selectedCat],
      });
      Object.entries(pieData).forEach((c) => {
        let [key, _] = c;
        if (pieData[key])
          pieData[key] = { ...pieData[key], color: colors.pop() };
      });
    }

    setPieChartData(Object.values(pieData));
  }, [data, selectedCat, selectedUser]);

  return (
    <ResponsivePie
      data={pieChartData}
      colors={{ datum: "data.color" }}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={4}
      activeOuterRadiusOffset={2}
      borderWidth={1}
      sortByValue={true}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLabelsComponent={({ label, style }) => (
        <animated.g
          transform={style.transform as any}
          style={{ pointerEvents: "none" }}
        >
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill={style.textColor}
            style={{
              fontSize: 10,
            }}
          >
            ${" "}
            <tspan
              style={{
                fontWeight: 800,
              }}
            >
              {label}
            </tspan>
          </text>
        </animated.g>
      )}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLinkLabelsStraightLength={8}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      tooltip={({ datum: t }) => (
        <div className="flex items-center justify-center gap-x-1 rounded-md bg-white p-2 shadow">
          {t.data.icon && <Icon name={t.data.label} img={t.data.icon} />}
          {t.data.label}: $
          <span className="ml-[-2px] font-bold">{t.value}</span>
        </div>
      )}
    />
  );
}

export default PieChart;
