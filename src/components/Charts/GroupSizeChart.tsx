import React from "react";
import { Bar } from "react-chartjs-2";
import Match from "../../models/Match";
import Color from "../../models/Color";
import ChartUtils from "../../models/ChartUtils";
import HorizontalRule from "../HorizontalRule";

const labels = [
  "Solo queue",
  "Duo queue",
  "3-stack",
  "4-stack",
  "5-stack",
  "6-stack"
];

interface Props {
  matches: Match[];
  season: number;
  theme: string;
}

type Counts = {
  [groupSize: number]: number;
};

const getCountsByGroupSize = (filteredMatches: Match[]) => {
  const countsByGroupSize: Counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  for (const match of filteredMatches) {
    if (match.groupSize) {
      countsByGroupSize[match.groupSize]++;
    }
  }

  return Object.values(countsByGroupSize);
};

const moreThanOneGroupSize = (matches: Match[]) => {
  const countsByGroupSize = getCountsByGroupSize(matches);
  let numGroupSizes = 0;
  for (const groupSize in countsByGroupSize) {
    if (countsByGroupSize[groupSize] > 0) {
      numGroupSizes++;
    }
  }
  return numGroupSizes > 1;
};

const numberAxisOptions = [
  { ticks: { callback: ChartUtils.wholeTicks, beginAtZero: true } }
];
const labelAxisOptions = [{ ticks: { autoSkip: false } }];
const scales = { xAxes: labelAxisOptions, yAxes: numberAxisOptions };
const options = {
  scales,
  responsive: true,
  maintainAspectRatio: false
};

const GroupSizeChart = ({ matches, season, theme }: Props) => {
  if (!moreThanOneGroupSize(matches)) {
    return null;
  }

  const wins = getCountsByGroupSize(matches.filter(match => match.isWin()));
  const losses = getCountsByGroupSize(matches.filter(match => match.isLoss()));
  const draws = getCountsByGroupSize(matches.filter(match => match.isDraw()));
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: Color.transparentWin,
        borderColor: Color.win,
        borderWidth: 2,
        label: "Wins",
        data: wins
      },
      {
        backgroundColor: Color.transparentLoss,
        borderColor: Color.loss,
        borderWidth: 2,
        label: "Losses",
        data: losses
      },
      {
        backgroundColor: Color.transparentDraw,
        borderColor: Color.draw,
        borderWidth: 2,
        label: "Draws",
        data: draws
      }
    ]
  };

  return (
    <>
      <HorizontalRule />
      <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
        Wins/Losses by Group Size
        <span className="text-gray text-normal h4 d-inline-block ml-2">
          Season {season}
        </span>
      </h3>
      <div className="small-chart-container">
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default GroupSizeChart;
