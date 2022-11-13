import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@primer/react";
import Color from "../../models/Color";
import Match from "../../models/Match";
import ChartUtils from "../../models/ChartUtils";
import ChartHeader from "./ChartHeader";

interface Props {
  matches: Match[];
  season: number;
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{ ticks: { callback: ChartUtils.wholeTicks }, stacked: true }]
  },
  tooltips: {
    model: "label",
    callbacks: {
      label: ChartUtils.numberWithPercentageLabel
    }
  }
};

const BadActorChart = ({ matches, season }: Props) => {
  const getThrowers = () => {
    let allyCount = 0;
    let enemyCount = 0;

    for (const match of matches) {
      if (match.enemyThrower) {
        enemyCount++;
      }
      if (match.allyThrower) {
        allyCount++;
      }
    }

    return [allyCount, enemyCount];
  };

  const getLeavers = () => {
    let allyCount = 0;
    let enemyCount = 0;

    for (const match of matches) {
      if (match.enemyLeaver) {
        enemyCount++;
      }
      if (match.allyLeaver) {
        allyCount++;
      }
    }

    return [allyCount, enemyCount];
  };

  const getCheaters = () => {
    let allyCount = 0;
    let enemyCount = 0;

    for (const match of matches) {
      if (match.enemyCheater) {
        enemyCount++;
      }
      if (match.allyCheater) {
        allyCount++;
      }
    }

    return [allyCount, enemyCount];
  };

  const data = {
    labels: ["My Team", "Enemy Team"],
    datasets: [
      {
        backgroundColor: Color.transparentAlly,
        borderColor: Color.ally,
        borderWidth: 2,
        label: "Throwers",
        data: getThrowers(),
        stack: "2"
      },
      {
        backgroundColor: Color.transparentEnemy,
        borderColor: Color.enemy,
        borderWidth: 2,
        label: "Leavers",
        data: getLeavers(),
        stack: "2"
      },
      {
        backgroundColor: Color.transparentDraw,
        borderColor: Color.draw,
        borderWidth: 2,
        label: "Cheaters",
        data: getCheaters(),
        stack: "2"
      }
    ]
  };

  return (
    <Box display="flex" flex="1" flexDirection="column">
      <ChartHeader title="Bad Actors" seasonNumber={season} />
      <div className="small-chart-container">
        <Bar data={data} options={options} />
      </div>
    </Box>
  );
};

export default BadActorChart;
