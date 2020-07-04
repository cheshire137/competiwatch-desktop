import React from "react";
import Match from "../../models/Match";
import { Flex } from "@primer/components";
import { Bar } from "react-chartjs-2";
import Color from "../../models/Color";
import ChartUtils from "../../models/ChartUtils";

interface Props {
  matches: Match[];
  season: number;
}

const simpleLabels = [
  // must be in the same order as `labels`
  "weekday morning",
  "weekday afternoon",
  "weekday evening",
  "weekday night",
  "weekend morning",
  "weekend afternoon",
  "weekend evening",
  "weekend night"
];

const labels = [
  // must be in the same order as `simpleLabels`
  ["👔 🌅", "Weekday Morning"],
  ["👔 😎", "Weekday Afternoon"],
  ["👔 🌆", "Weekday Evening"],
  ["👔 🌝", "Weekday Night"],
  ["🎉 🌅", "Weekend Morning"],
  ["🎉 😎", "Weekend Afternoon"],
  ["🎉 🌆", "Weekend Evening"],
  ["🎉 🌝", "Weekend Night"]
];

type Counts = {
  [label: string]: number;
};

const getCountsByDayTime = (filteredMatches: Match[]) => {
  const countsByDayTime: Counts = {};

  for (const label of simpleLabels) {
    countsByDayTime[label] = 0;
  }

  for (const match of filteredMatches) {
    if (match.dayOfWeek && match.timeOfDay) {
      const label = `${match.dayOfWeek} ${match.timeOfDay}`;
      countsByDayTime[label]++;
    }
  }

  return Object.values(countsByDayTime);
};

const numberAxisOptions = [
  { ticks: { callback: ChartUtils.wholeTicks, beginAtZero: true } }
];
const labelAxisOptions = [{ ticks: { autoSkip: false } }];
const scales = { xAxes: labelAxisOptions, yAxes: numberAxisOptions };
const options = {
  scales,
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    model: "label",
    callbacks: {
      label: ChartUtils.numberWithPercentageLabel
    }
  }
};

const BadActorsTimeChart = ({ matches, season }: Props) => {
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: Color.transparentAlly,
        borderColor: Color.ally,
        borderWidth: 2,
        label: "Throwers",
        data: getCountsByDayTime(matches.filter(match => match.hasThrower()))
      },
      {
        backgroundColor: Color.transparentEnemy,
        borderColor: Color.enemy,
        borderWidth: 2,
        label: "Leavers",
        data: getCountsByDayTime(matches.filter(match => match.hasLeaver()))
      },
      {
        backgroundColor: Color.transparentDraw,
        borderColor: Color.draw,
        borderWidth: 2,
        label: "Cheaters",
        data: getCountsByDayTime(matches.filter(match => match.hasCheater()))
      }
    ]
  };

  return (
    <Flex flex="1" flexDirection="column">
      <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
        Bad Actors by Day and Time
        <span className="text-gray text-normal h4 d-inline-block ml-2">
          Season {season}
        </span>
      </h3>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </Flex>
  );
};

export default BadActorsTimeChart;
