import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2'
import Color from '../models/Color'
import Hero from '../models/Hero'

const roleFor = hero => {
  if (Hero.byType.DPS.indexOf(hero) > -1) {
    return 'DPS'
  }
  if (Hero.byType['Main Healer'].indexOf(hero) > -1) {
    return 'Main Healer'
  }
  if (Hero.byType['Off-healer'].indexOf(hero) > -1) {
    return 'Off-healer'
  }
  if (Hero.byType.Flanker.indexOf(hero) > -1) {
    return 'Flanker'
  }
  if (Hero.byType.Defense.indexOf(hero) > -1) {
    return 'Defense'
  }
  if (Hero.byType.Hitscan.indexOf(hero) > -1) {
    return 'Hitscan'
  }
  if (Hero.byType['Main Tank'].indexOf(hero) > -1) {
    return 'Main Tank'
  }
  if (Hero.byType['Off-tank'].indexOf(hero) > -1) {
    return 'Off-tank'
  }
}

class RoleChart extends Component {
  getCountsByRole = filteredMatches => {
    const countsByRole = {}

    for (const role of Hero.roles) {
      countsByRole[role] = 0
    }

    for (const match of filteredMatches) {
      for (const hero of match.heroList) {
        countsByRole[roleFor(hero)]++
      }
    }

    return Object.values(countsByRole)
  }

  getWins = () => {
    const wonMatches = this.props.matches.filter(match => match.isWin())
    return this.getCountsByRole(wonMatches)
  }

  getLosses = () => {
    const lostMatches = this.props.matches.filter(match => match.isLoss())
    return this.getCountsByRole(lostMatches)
  }

  render() {
    const { season } = this.props
    const options = {
      responsive: true, maintainAspectRatio: false,
      legend: { position: 'left' },
      scale: { ticks: { showLabelBackdrop: false, beginAtZero: true } }
    }
    const winCounts = this.getWins()
    const lossCounts = this.getLosses()
    const borderWidth = 2
    const pointRadius = 3
    const pointHoverRadius = 4
    const data = {
      labels: Hero.roles,
      datasets: [
        {
          label: '# Wins',
          backgroundColor: Color.transparentWin,
          pointBackgroundColor: Color.transparentWin,
          pointBorderColor: Color.winBorder,
          borderColor: Color.win,
          borderWidth,
          pointRadius,
          pointHoverRadius,
          data: winCounts
        },
        {
          label: '# Losses',
          backgroundColor: Color.transparentLoss,
          pointBackgroundColor: Color.transparentLoss,
          pointBorderColor: Color.lossBorder,
          borderColor: Color.loss,
          borderWidth,
          pointRadius,
          pointHoverRadius,
          data: lossCounts
        }
      ]
    }

    return (
      <div>
        <h3 className="h3 flex-justify-center d-flex flex-items-center mb-2">
          Wins/Losses by Role
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="tall-chart-container">
          <Radar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default RoleChart
