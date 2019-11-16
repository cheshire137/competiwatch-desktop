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

class ThrowerLeaverTimeChart extends Component {
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

  getThrowers = () => {
    const thrownMatches = this.props.matches.filter(match => match.hasThrower())
    return this.getCountsByDayTime(thrownMatches)
  }

  getLeavers = () => {
    const leaverMatches = this.props.matches.filter(match => match.hasLeaver())
    return this.getCountsByDayTime(leaverMatches)
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
    const throwers = this.getThrowers()
    const leavers = this.getLeavers()
    const data = {
      labels,
      datasets: [
        {
          backgroundColor: Color.transparentAlly,
          borderColor: Color.ally,
          borderWidth: 2,
          label: 'Throwers',
          data: throwers
        },
        {
          backgroundColor: Color.transparentEnemy,
          borderColor: Color.enemy,
          borderWidth: 2,
          label: 'Leavers',
          data: leavers
        }
      ]
    }

    return (
      <div>
        <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
          Throwers/Leavers by Day and Time
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default ThrowerLeaverTimeChart
