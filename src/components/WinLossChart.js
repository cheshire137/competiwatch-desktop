import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import Color from '../models/Color'

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
          backgroundColor: [Color.transparentWin, Color.transparentLoss, Color.transparentDraw],
          borderColor: [Color.win, Color.loss, Color.draw],
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
