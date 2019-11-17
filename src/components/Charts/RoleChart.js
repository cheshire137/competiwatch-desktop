import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2'
import Color from '../../models/Color'
import { HeroesByType, HeroDetailedRoles } from '../../models/Hero'

const roleFor = hero => {
  if (HeroesByType.DPS.indexOf(hero) > -1) {
    return 'DPS'
  }
  if (HeroesByType['Main Healer'].indexOf(hero) > -1) {
    return 'Main Healer'
  }
  if (HeroesByType['Off-healer'].indexOf(hero) > -1) {
    return 'Off-healer'
  }
  if (HeroesByType.Flanker.indexOf(hero) > -1) {
    return 'Flanker'
  }
  if (HeroesByType.Defense.indexOf(hero) > -1) {
    return 'Defense'
  }
  if (HeroesByType.Hitscan.indexOf(hero) > -1) {
    return 'Hitscan'
  }
  if (HeroesByType['Main Tank'].indexOf(hero) > -1) {
    return 'Main Tank'
  }
  if (HeroesByType['Off-tank'].indexOf(hero) > -1) {
    return 'Off-tank'
  }
}

class RoleChart extends Component {
  getCountsByRole = filteredMatches => {
    const countsByRole = {}

    for (const role of HeroDetailedRoles) {
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
    const { season, theme } = this.props
    const winCounts = this.getWins()
    const lossCounts = this.getLosses()
    let maxCount = Math.max(...winCounts.concat(lossCounts))
    maxCount = maxCount + Math.floor(maxCount * 0.1)
    const isDarkTheme = theme === 'dark'
    const options = {
      responsive: true, maintainAspectRatio: false,
      legend: { position: 'left' },
      scale: {
        ticks: {
          showLabelBackdrop: false,
          beginAtZero: true,
          maxTicksLimit: 3,
          min: 0,
          max: maxCount,
          display: false
        },
        gridLines: false,
        angleLines: {
          display: true,
          lineWidth: 0.5,
          color: isDarkTheme ? Color.darkThemeLine : Color.lightThemeLine
        },
        pointLabels: { fontSize: 14 }
      }
    }
    const borderWidth = 2
    const pointRadius = 3
    const pointHoverRadius = 6
    const pointBorderWidth = 2
    const pointBackgroundColor = isDarkTheme ? 'rgba(36, 41, 46, 0.8)' : 'rgba(255, 255, 255, 0.8)'
    const lineTension = 0.1
    const data = {
      labels: HeroDetailedRoles,
      datasets: [
        {
          label: '# Wins',
          backgroundColor: Color.veryTransparentWin,
          pointBackgroundColor,
          pointBorderColor: Color.win,
          pointHoverBorderColor: Color.winBorder,
          pointHoverBackgroundColor: Color.win,
          borderColor: Color.win,
          borderWidth,
          pointRadius,
          pointHoverRadius,
          pointBorderWidth,
          lineTension,
          data: winCounts
        },
        {
          label: '# Losses',
          backgroundColor: Color.veryTransparentLoss,
          pointBackgroundColor,
          pointBorderColor: Color.loss,
          pointHoverBorderColor: Color.lossBorder,
          pointHoverBackgroundColor: Color.loss,
          borderColor: Color.loss,
          borderWidth,
          pointRadius,
          pointHoverRadius,
          pointBorderWidth,
          lineTension,
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
