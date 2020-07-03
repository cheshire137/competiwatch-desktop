import React from "react";
import { Bar } from "react-chartjs-2";
import Match from "../../models/Match";
import Color from "../../models/Color";
import { Heroes, Hero } from "../../models/Hero";
import ChartUtils from "../../models/ChartUtils";

const getCountsForHeroes = (heroes: Hero[], filteredMatches: Match[]) => {
  return heroes.map(
    hero =>
      filteredMatches.filter(match => new Set(match.heroList).has(hero)).length
  );
};

const getHeroLabels = (matches: Match[]) => {
  const allPlayedHeroes = matches
    .filter(match => match.heroList.length > 0)
    .map(match => match.heroList)
    .flat();
  const playedHeroes = new Set(allPlayedHeroes);

  return Heroes.filter(hero => playedHeroes.has(hero));
};

interface Props {
  matches: Match[];
  season: number;
}

const options = {
  scales: {
    xAxes: [{ ticks: { autoSkip: false } }],
    yAxes: [{ ticks: { callback: ChartUtils.wholeTicks } }]
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    model: "label",
    callbacks: {
      label: ChartUtils.numberWithPercentageLabel
    }
  }
};

const HeroesChart = ({ matches, season }: Props) => {
  const getWins = (heroes: Hero[]) => {
    return getCountsForHeroes(
      heroes,
      matches.filter(match => match.isWin())
    );
  };

  const getLosses = (heroes: Hero[]) => {
    return getCountsForHeroes(
      heroes,
      matches.filter(match => match.isLoss())
    );
  };

  const getDraws = (heroes: Hero[]) => {
    return getCountsForHeroes(
      heroes,
      matches.filter(match => match.isDraw())
    );
  };

  const labels = getHeroLabels(matches);
  const wins = getWins(labels);
  const losses = getLosses(labels);
  const draws = getDraws(labels);
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
    <div>
      <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
        Wins/Losses by Hero
        <span className="text-gray text-normal h4 d-inline-block ml-2">
          Season {season}
        </span>
      </h3>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HeroesChart;
