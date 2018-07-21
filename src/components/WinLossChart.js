import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

const transparentWinColor = 'rgba(41,253,47,0.7)'
const transparentLossColor = 'rgba(202,8,19,0.7)'
const transparentDrawColor = 'rgba(254,216,111,0.7)'
const winColor = '#29fd2f'
const lossColor = '#ca0813'
const drawColor = '#fed86f'

class WinLossChart extends Component {
  render() {
    const { matches, season } = this.props
    const wins = matches.filter(match => match.isWin()).length
    const losses = matches.filter(match => match.isLoss()).length
    const draws = matches.filter(match => match.isDraw()).length
    const options = {
      responsive: true, maintainAspectRatio: false,
      legend: { position: 'left' }
    }
    const data = {
      labels: ['Wins', 'Losses', 'Draws'],
      datasets: [
        {
          backgroundColor: [transparentWinColor, transparentLossColor, transparentDrawColor],
          borderColor: [winColor, lossColor, drawColor],
          data: [wins, losses, draws]
        }
      ]
    }

    return (
      <div>
        <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
          Win/Loss %
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="medium-chart-container">
          <Pie data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default WinLossChart
