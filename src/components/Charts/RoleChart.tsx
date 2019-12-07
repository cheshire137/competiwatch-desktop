import React from "react";
import { Radar } from "react-chartjs-2";
import Color from "../../models/Color";
import Match from "../../models/Match";
import {
  HeroDetailedRoles,
  HeroDetailedRole
} from "../../models/Hero";

interface Props {
  matches: Match[];
  season: number;
  theme: string;
}

const getCountsByRole = (roles: HeroDetailedRole[], filteredMatches: Match[]) => {
  return roles.map(role =>
    filteredMatches.filter(match => match.detailedRoles().includes(role)).length);
};

const borderWidth = 2;
const pointRadius = 3;
const pointHoverRadius = 6;
const pointBorderWidth = 2;
const lineTension = 0.1;

const RoleChart = ({ matches, season, theme }: Props) => {
  const labels = HeroDetailedRoles;
  const winCounts = getCountsByRole(labels, matches.filter(match => match.isWin()));
  const lossCounts = getCountsByRole(labels, matches.filter(match => match.isLoss()));
  let maxCount = Math.max(...winCounts.concat(lossCounts));
  maxCount = maxCount + Math.floor(maxCount * 0.1);
  const isDarkTheme = theme === "dark";
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: "left" },
    scale: {
      ticks: {
        showLabelBackdrop: false,
        beginAtZero: true,
        maxTicksLimit: 3,
        min: 0,
        max: maxCount,
        display: false
      },
      gridLines: false,
      angleLines: {
        display: true,
        lineWidth: 0.5,
        color: isDarkTheme ? Color.darkThemeLine : Color.lightThemeLine
      },
      pointLabels: { fontSize: 14 }
    }
  };
  const pointBackgroundColor = isDarkTheme
    ? "rgba(36, 41, 46, 0.8)"
    : "rgba(255, 255, 255, 0.8)";
  const data = {
    labels,
    datasets: [
      {
        label: "# Wins",
        backgroundColor: Color.veryTransparentWin,
        pointBackgroundColor,
        pointBorderColor: Color.win,
        pointHoverBorderColor: Color.winBorder,
        pointHoverBackgroundColor: Color.win,
        borderColor: Color.win,
        borderWidth,
        pointRadius,
        pointHoverRadius,
        pointBorderWidth,
        lineTension,
        data: winCounts
      },
      {
        label: "# Losses",
        backgroundColor: Color.veryTransparentLoss,
        pointBackgroundColor,
        pointBorderColor: Color.loss,
        pointHoverBorderColor: Color.lossBorder,
        pointHoverBackgroundColor: Color.loss,
        borderColor: Color.loss,
        borderWidth,
        pointRadius,
        pointHoverRadius,
        pointBorderWidth,
        lineTension,
        data: lossCounts
      }
    ]
  };

  return (
    <div>
      <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
        Wins/Losses by Role
        <span className="text-gray text-normal h4 d-inline-block ml-2">
          Season {season}
        </span>
      </h3>
      <div className="tall-chart-container">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RoleChart;
