import React from "react";
import { Bar } from "react-chartjs-2";
import { Flex } from "@primer/components";
import Color from "../../models/Color";
import Match from "../../models/Match";
import ChartUtils from "../../models/ChartUtils";

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
    <Flex flex="1" flexDirection="column">
      <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
        Bad Actors
        <span className="text-gray text-normal h4 d-inline-block ml-2">
          Season {season}
        </span>
      </h3>
      <div className="small-chart-container">
        <Bar data={data} options={options} />
      </div>
    </Flex>
  );
};

export default BadActorChart;
