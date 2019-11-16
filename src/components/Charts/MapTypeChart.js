import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Color from '../../models/Color'
import ChartUtils from '../../models/ChartUtils'
import Map from '../../models/Map'

function mapTypeFor(map) {
  for (const mapType in Map.byType) {
    if (Map.byType[mapType].indexOf(map) > -1) {
      return mapType
    }
  }
}

class MapTypeChart extends Component {
  getCountsByMapType = (matchesWithMaps, filterer) => {
    const countsByMapType = {}
    const types = Object.keys(Map.byType)

    for (const mapType of types) {
      countsByMapType[mapType] = 0
    }

    for (const match of matchesWithMaps) {
      if (filterer(match)) {
        const mapType = mapTypeFor(match.map)

        if (mapType in countsByMapType) {
          countsByMapType[mapType]++
        }
      }
    }

    return Object.values(countsByMapType)
  }

  getLosses = matchesWithMaps => {
    return this.getCountsByMapType(matchesWithMaps, match => match.isLoss())
  }

  getWins = matchesWithMaps => {
    return this.getCountsByMapType(matchesWithMaps, match => match.isWin())
  }

  getDraws = matchesWithMaps => {
    return this.getCountsByMapType(matchesWithMaps, match => match.isDraw())
  }

  getLabels = () => {
    const types = Object.keys(Map.byType)
    const labels = []

    for (const mapType of types) {
      let label = mapType
      if (mapType in Map.typeAliases) {
        label += ` (${Map.typeAliases[mapType]})`
      }
      labels.push(label)
    }

    return labels
  }

  render() {
    const { season, matches } = this.props
    const matchesWithMaps = matches.filter(match => match.map && match.map.length > 0)
    const numberAxisOptions = [{ ticks: { callback: ChartUtils.wholeTicks, beginAtZero: true } }]
    const labelAxisOptions = [{ ticks: { autoSkip: false } }]
    const options = {
      scales: { xAxes: labelAxisOptions, yAxes: numberAxisOptions },
      responsive: true,
      maintainAspectRatio: false
    }
    const data = {
      labels: this.getLabels(),
      datasets: [
        {
          backgroundColor: Color.transparentWin,
          borderColor: Color.win,
          borderWidth: 2,
          label: 'Wins',
          data: this.getWins(matchesWithMaps)
        },
        {
          backgroundColor: Color.transparentLoss,
          borderColor: Color.loss,
          borderWidth: 2,
          label: 'Losses',
          data: this.getLosses(matchesWithMaps)
        },
        {
          backgroundColor: Color.transparentDraw,
          borderColor: Color.draw,
          borderWidth: 2,
          label: 'Draws',
          data: this.getDraws(matchesWithMaps)
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
    )
  }
}

export default MapTypeChart
