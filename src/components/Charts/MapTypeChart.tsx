import React from 'react'
import { Bar } from 'react-chartjs-2'
import Match from '../../models/Match'
import Color from '../../models/Color'
import ChartUtils from '../../models/ChartUtils'
import { Map, AssaultMap, MapType, MapTypes, MapTypeAliases, AssaultMaps, ControlMap, EscortMap, HybridMap, MapsByType } from '../../models/Map'

function mapTypeFor(map: Map): MapType | undefined {
  for (const mapType of MapTypes) {
    if (MapsByType[mapType].includes(map)) {
      return mapType;
    }
  }
}

type Counts = {
  [mapType: string]: number;
}

const getCountsByMapType = (matchesWithMaps: Match[], filterer: (match: Match) => boolean) => {
  const countsByMapType: Counts = {}

  for (const match of matchesWithMaps) {
    if (filterer(match)) {
      if (match.map) {
        const mapType = mapTypeFor(match.map)
        if (mapType) {
          countsByMapType[mapType] = (countsByMapType[mapType] || 0) + 1;
        }
      }
    }
  }

  return Object.values(countsByMapType)
};

interface Props {
  matches: Match[];
  season: number;
}

const getLabels = () => {
  const labels = []

  for (const mapType of MapTypes) {
    let label = mapType
    if (mapType in MapTypeAliases && MapTypeAliases[mapType] !== mapType) {
      label += ` (${MapTypeAliases[mapType]})`
    }
    labels.push(label)
  }

  return labels
}

const MapTypeChart = ({ matches, season }: Props) => {
  const matchesWithMaps = matches.filter(match => match.map && match.map.length > 0)
  const numberAxisOptions = [{ ticks: { callback: ChartUtils.wholeTicks, beginAtZero: true } }]
  const labelAxisOptions = [{ ticks: { autoSkip: false } }]
  const options = {
    scales: { xAxes: labelAxisOptions, yAxes: numberAxisOptions },
    responsive: true,
    maintainAspectRatio: false
  }
  const data = {
    labels: getLabels(),
    datasets: [
      {
        backgroundColor: Color.transparentWin,
        borderColor: Color.win,
        borderWidth: 2,
        label: 'Wins',
        data: getCountsByMapType(matchesWithMaps, match => match.isWin())
      },
      {
        backgroundColor: Color.transparentLoss,
        borderColor: Color.loss,
        borderWidth: 2,
        label: 'Losses',
        data: getCountsByMapType(matchesWithMaps, match => match.isLoss())
      },
      {
        backgroundColor: Color.transparentDraw,
        borderColor: Color.draw,
        borderWidth: 2,
        label: 'Draws',
        data: getCountsByMapType(matchesWithMaps, match => match.isDraw())
      }
    ]
  }

  return (
    <div>
      <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
        Wins/Losses per Map Type
        <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
      </h3>
      <div className="small-chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MapTypeChart;
