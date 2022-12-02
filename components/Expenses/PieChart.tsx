import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";

import { IExpense } from "../../interfaces/expense";

type Props = {
  data: IExpense[];
  selectedUser: string;
  selectedCat: string;
};

interface IPieChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

function PieChart({ data, selectedUser, selectedCat }: Props) {
  const [pieChartData, setPieChartData] = useState<IPieChartData[]>([]);

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
          id: cat.name,
          label: cat.name,
        };
      }
      return acc;
    }, {});
    setPieChartData(Object.values(pieData));
  }, [data, selectedCat, selectedUser]);

  return (
    <ResponsivePie
      data={pieChartData}
      margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
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
      //   fill={[
      //     {
      //       match: {
      //         id: "ruby",
      //       },
      //       id: "dots",
      //     },
      //     {
      //       match: {
      //         id: "c",
      //       },
      //       id: "dots",
      //     },
      //     {
      //       match: {
      //         id: "go",
      //       },
      //       id: "dots",
      //     },
      //     {
      //       match: {
      //         id: "python",
      //       },
      //       id: "dots",
      //     },
      //     {
      //       match: {
      //         id: "scala",
      //       },
      //       id: "lines",
      //     },
      //     {
      //       match: {
      //         id: "lisp",
      //       },
      //       id: "lines",
      //     },
      //     {
      //       match: {
      //         id: "elixir",
      //       },
      //       id: "lines",
      //     },
      //     {
      //       match: {
      //         id: "javascript",
      //       },
      //       id: "lines",
      //     },
      //   ]}
      //   legends={[
      //     {
      //       anchor: "bottom",
      //       direction: "row",
      //       justify: false,
      //       translateX: 0,
      //       translateY: 60,
      //       itemsSpacing: 0,
      //       itemWidth: 50,
      //       itemHeight: 18,
      //       itemTextColor: "#707070",
      //       itemDirection: "left-to-right",
      //       itemOpacity: 1,
      //       symbolSize: 12,
      //       symbolShape: "circle",
      //       effects: [
      //         {
      //           on: "hover",
      //           style: {
      //             itemTextColor: "#000",
      //           },
      //         },
      //       ],
      //     },
      //   ]}
    />
  );
}

export default PieChart;
