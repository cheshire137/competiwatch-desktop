import React from "react";
import Match from "../../models/Match";
import { Line } from "react-chartjs-2";
import Color from "../../models/Color";
import ChartUtils from "../../models/ChartUtils";
import ChartHeader from "./ChartHeader";

interface Props {
  matches: Match[];
  season: number;
}

const options = {
  scales: {
    xAxes: [{ ticks: { autoSkip: true } }],
    yAxes: [{ ticks: { callback: ChartUtils.wholeTicks } }]
  },
  responsive: true,
  maintainAspectRatio: false
};

const StreaksChart = ({ matches, season }: Props) => {
  const gameNumbers = () => {
    const numbers = [];

    for (let number = 1; number <= matches.length; number++) {
      numbers.push(number);
    }

    return numbers;
  };

  const data = {
    labels: gameNumbers(),
    datasets: [
      {
        fill: "origin",
        label: "Win Streak",
        backgroundColor: Color.transparentWin,
        borderColor: Color.win,
        borderWidth: 2,
        data: matches.map(match => match.winStreak || 0),
        pointRadius: 0
      },
      {
        fill: "origin",
        label: "Loss Streak",
        backgroundColor: Color.transparentLoss,
        borderColor: Color.loss,
        borderWidth: 2,
        data: matches.map(match => match.lossStreak || 0),
        pointRadius: 0
      }
    ]
  };

  return (
    <div>
      <ChartHeader title="Win/Loss Streaks" seasonNumber={season} />
      <div className="small-chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StreaksChart;
