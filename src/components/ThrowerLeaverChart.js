import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Color from '../models/Color'

const wholeTicks = value => {
  if (Number.isInteger(value)) {
    return value
  }
}

class ThrowerLeaverChart extends Component {
  getAllies = () => {
    const { matches } = this.props
    let throwerCount = 0
    let leaverCount = 0

    for (const match of matches) {
      if (match.allyLeaver) {
        leaverCount++
      }
      if (match.allyThrower) {
        throwerCount++
      }
    }

    return [throwerCount, leaverCount]
  }

  getEnemies = () => {
    const { matches } = this.props
    let throwerCount = 0
    let leaverCount = 0

    for (const match of matches) {
      if (match.enemyLeaver) {
        leaverCount++
      }
      if (match.enemyThrower) {
        throwerCount++
      }
    }

    return [throwerCount, leaverCount]
  }

  render() {
    const { season } = this.props
    const options = {
      responsive: true, maintainAspectRatio: false,
      scales: {
        yAxes: [{ ticks: { callback: wholeTicks } }]
      }
    }
    const data = {
      labels: ['Throwers', 'Leavers'],
      datasets: [
        {
          backgroundColor: Color.transparentAlly,
          borderColor: Color.ally,
          borderWidth: 2,
          label: 'My Team',
          data: this.getAllies()
        },
        {
          backgroundColor: Color.transparentEnemy,
          borderColor: Color.enemy,
          borderWidth: 2,
          label: 'Enemy Team',
          data: this.getEnemies()
        }
      ]
    }

    return (
      <div>
        <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
          Throwers/Leavers
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="small-chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default ThrowerLeaverChart
