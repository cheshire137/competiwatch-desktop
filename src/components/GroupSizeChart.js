import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Color from '../models/Color'
import ChartUtils from '../models/ChartUtils'

const labels = [
  'Solo queue',
  'Duo queue',
  '3-stack',
  '4-stack',
  '5-stack',
  '6-stack'
]

class GroupSizeChart extends Component {
  getCountsByGroupSize = filteredMatches => {
    const countsByGroupSize = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

    for (const match of filteredMatches) {
      countsByGroupSize[match.groupSize]++
    }

    return Object.values(countsByGroupSize)
  }

  getWins = () => {
    const wonMatches = this.props.matches.filter(match => match.isWin())
    return this.getCountsByGroupSize(wonMatches)
  }

  getLosses = () => {
    const lostMatches = this.props.matches.filter(match => match.isLoss())
    return this.getCountsByGroupSize(lostMatches)
  }

  getDraws = () => {
    const drawnMatches = this.props.matches.filter(match => match.isDraw())
    return this.getCountsByGroupSize(drawnMatches)
  }

  render() {
    const { season } = this.props
    const numberAxisOptions = [{ ticks: { callback: ChartUtils.wholeTicks, beginAtZero: true } }]
    const labelAxisOptions = [{ ticks: { autoSkip: false } }]
    const scales = { xAxes: labelAxisOptions, yAxes: numberAxisOptions }
    const options = {
      scales,
      responsive: true,
      maintainAspectRatio: false
    }
    const wins = this.getWins()
    const losses = this.getLosses()
    const draws = this.getDraws()
    const data = {
      labels,
      datasets: [
        {
          backgroundColor: Color.transparentWin,
          borderColor: Color.win,
          borderWidth: 2,
          label: 'Wins',
          data: wins
        },
        {
          backgroundColor: Color.transparentLoss,
          borderColor: Color.loss,
          borderWidth: 2,
          label: 'Losses',
          data: losses
        },
        {
          backgroundColor: Color.transparentDraw,
          borderColor: Color.draw,
          borderWidth: 2,
          label: 'Draws',
          data: draws
        }
      ]
    }

    return (
      <div>
        <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
          Wins/Losses by Group Size
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="small-chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default GroupSizeChart
