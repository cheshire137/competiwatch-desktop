import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import Color from '../models/Color'

class WinLossChart extends Component {
  getCounts = () => {
    const { matches } = this.props
    const wins = matches.filter(match => match.isWin()).length
    const losses = matches.filter(match => match.isLoss()).length
    const draws = matches.filter(match => match.isDraw()).length

    return [wins, losses, draws]
  }

  getLabels = (totalMatches, data) => {
    const winPct = Math.round((data[0] / totalMatches) * 100)
    const lossPct = Math.round((data[1] / totalMatches) * 100)
    const drawPct = Math.round((data[2] / totalMatches) * 100)
    const winLabel = `${winPct}% Wins`
    const lossLabel = `${lossPct}% Losses`
    const drawLabel = `${drawPct}% Draws`

    return [winLabel, lossLabel, drawLabel]
  }

  render() {
    const { season, matches } = this.props
    const totalMatches = matches
      .filter(match => match.isWin() || match.isLoss() || match.isDraw()).length
    const counts = this.getCounts()
    const options = {
      responsive: true, maintainAspectRatio: false,
      legend: { position: 'left' }
    }
    const data = {
      labels: this.getLabels(totalMatches, counts),
      datasets: [
        {
          backgroundColor: [Color.transparentWin, Color.transparentLoss, Color.transparentDraw],
          borderColor: [Color.win, Color.loss, Color.draw],
          data: counts
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
