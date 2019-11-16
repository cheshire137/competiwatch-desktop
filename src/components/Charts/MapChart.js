import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Color from '../../models/Color'
import ChartUtils from '../../models/ChartUtils'
import Map from '../../models/Map'

class MapChart extends Component {
  getCountsByMap = (matchesWithMaps, filterer) => {
    const countsByMap = {}

    for (const map of Map.names) {
      countsByMap[map] = 0
    }

    for (const match of matchesWithMaps) {
      if (filterer(match) && match.map in countsByMap) {
        countsByMap[match.map]++
      }
    }

    return Object.values(countsByMap)
  }

  getLosses = matchesWithMaps => {
    return this.getCountsByMap(matchesWithMaps, match => match.isLoss())
  }

  getWins = matchesWithMaps => {
    return this.getCountsByMap(matchesWithMaps, match => match.isWin())
  }

  getDraws = matchesWithMaps => {
    return this.getCountsByMap(matchesWithMaps, match => match.isDraw())
  }

  getLabels = () => {
    const labels = []

    for (const map of Map.names) {
      if (map in Map.shortNames) {
        labels.push(Map.shortNames[map])
      } else {
        labels.push(map)
      }
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
          Wins/Losses per Map
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default MapChart
