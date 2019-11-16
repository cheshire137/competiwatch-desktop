import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Color from '../../models/Color'
import ChartUtils from '../../models/ChartUtils'

const simpleLabels = [ // must be in the same order as `labels`
  'weekday morning',
  'weekday afternoon',
  'weekday evening',
  'weekday night',
  'weekend morning',
  'weekend afternoon',
  'weekend evening',
  'weekend night'
]

const labels = [ // must be in the same order as `simpleLabels`
  ['👔 🌅', 'Weekday Morning'],
  ['👔 😎', 'Weekday Afternoon'],
  ['👔 🌆', 'Weekday Evening'],
  ['👔 🌝', 'Weekday Night'],
  ['🎉 🌅', 'Weekend Morning'],
  ['🎉 😎', 'Weekend Afternoon'],
  ['🎉 🌆', 'Weekend Evening'],
  ['🎉 🌝', 'Weekend Night']
]

class DayTimeChart extends Component {
  getCountsByDayTime = filteredMatches => {
    const countsByDayTime = {}

    for (const label of simpleLabels) {
      countsByDayTime[label] = 0
    }

    for (const match of filteredMatches) {
      if (match.dayOfWeek && match.timeOfDay) {
        const label = `${match.dayOfWeek} ${match.timeOfDay}`
        countsByDayTime[label]++
      }
    }

    return Object.values(countsByDayTime)
  }

  getWins = () => {
    const wonMatches = this.props.matches.filter(match => match.isWin())
    return this.getCountsByDayTime(wonMatches)
  }

  getLosses = () => {
    const lostMatches = this.props.matches.filter(match => match.isLoss())
    return this.getCountsByDayTime(lostMatches)
  }

  getDraws = () => {
    const drawnMatches = this.props.matches.filter(match => match.isDraw())
    return this.getCountsByDayTime(drawnMatches)
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
          Wins/Losses by Day and Time
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default DayTimeChart
