import React from "react";
import { Bar } from "react-chartjs-2";
import Match from "../../models/Match";
import Color from "../../models/Color";
import ChartUtils from "../../models/ChartUtils";
import { Maps, MapShortNames } from "../../models/Map";
import ChartHeader from "./ChartHeader";

type Counts = {
  [map: string]: number;
};

interface Props {
  matches: Match[];
  season: number;
}

const MapChart = ({ season, matches }: Props) => {
  const getCountsByMap = (
    matchesWithMaps: Match[],
    filterer: (match: Match) => boolean
  ) => {
    const countsByMap: Counts = {};

    for (const map of Maps) {
      countsByMap[map] = 0;
    }

    for (const match of matchesWithMaps) {
      if (filterer(match) && match.map && match.map in countsByMap) {
        countsByMap[match.map]++;
      }
    }

    return Object.values(countsByMap);
  };

  const getLosses = (matchesWithMaps: Match[]) => {
    return getCountsByMap(matchesWithMaps, match => match.isLoss());
  };

  const getWins = (matchesWithMaps: Match[]) => {
    return getCountsByMap(matchesWithMaps, match => match.isWin());
  };

  const getDraws = (matchesWithMaps: Match[]) => {
    return getCountsByMap(matchesWithMaps, match => match.isDraw());
  };

  const getLabels = () => {
    const labels: string[] = [];

    for (const map of Maps) {
      const shortName = MapShortNames[map];
      if (shortName) {
        labels.push(shortName);
      } else {
        labels.push(map);
      }
    }

    return labels;
  };

  const matchesWithMaps = matches.filter(
    match => match.map && match.map.length > 0
  );
  const numberAxisOptions = [
    { ticks: { callback: ChartUtils.wholeTicks, beginAtZero: true } }
  ];
  const labelAxisOptions = [{ ticks: { autoSkip: false } }];
  const options = {
    scales: { xAxes: labelAxisOptions, yAxes: Object.assign({}, numberAxisOptions, { stacked: true }) },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      model: "label",
      callbacks: {
        label: ChartUtils.numberWithPercentageLabel
      }
    }
  };
  const data = {
    labels: getLabels(),
    datasets: [
      {
        backgroundColor: Color.transparentWin,
        borderColor: Color.win,
        borderWidth: 2,
        label: "Wins",
        data: getWins(matchesWithMaps),
        stack: "2"
      },
      {
        backgroundColor: Color.transparentDraw,
        borderColor: Color.draw,
        borderWidth: 2,
        label: "Draws",
        data: getDraws(matchesWithMaps),
        stack: "2"
      },
      {
        backgroundColor: Color.transparentLoss,
        borderColor: Color.loss,
        borderWidth: 2,
        label: "Losses",
        data: getLosses(matchesWithMaps),
        stack: "2"
      }
    ]
  };

  return (
    <div>
      <ChartHeader title="Match Results by Map" seasonNumber={season} />
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MapChart;
