import React from "react";
import { Bar } from "react-chartjs-2";
import Color from "../../models/Color";
import ChartUtils from "../../models/ChartUtils";
import Match from "../../models/Match";
import ChartHeader from "./ChartHeader";

interface Props {
  matches: Match[];
  season: number;
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          callback: ChartUtils.wholeTicks,
          beginAtZero: true
        }
      }
    ]
  },
  tooltips: {
    model: "label",
    callbacks: {
      label: ChartUtils.numberWithPercentageLabel
    }
  }
};

const getCountsByVoiceStatus = (matches: Match[]) => {
  let joinedVoiceCount = 0;
  let didNotJoinVoiceCount = 0;

  for (const match of matches) {
    if (match.joinedVoice) {
      joinedVoiceCount++;
    } else {
      didNotJoinVoiceCount++;
    }
  }

  return [joinedVoiceCount, didNotJoinVoiceCount];
};

const VoiceChatChart = ({ matches, season }: Props) => {
  const data = {
    labels: ["Joined Voice", "Did Not Join Voice"],
    datasets: [
      {
        backgroundColor: Color.transparentWin,
        borderColor: Color.win,
        borderWidth: 2,
        label: "Wins",
        data: getCountsByVoiceStatus(matches.filter(match => match.isWin()))
      },
      {
        backgroundColor: Color.transparentLoss,
        borderColor: Color.loss,
        borderWidth: 2,
        label: "Losses",
        data: getCountsByVoiceStatus(matches.filter(match => match.isLoss()))
      }
    ]
  };

  return (
    <div>
      <ChartHeader title="Voice Chat" seasonNumber={season} />
      <div className="small-chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default VoiceChatChart;
