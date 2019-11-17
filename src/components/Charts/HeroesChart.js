import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Color from '../../models/Color'
import { Heroes } from '../../models/Hero';
import ChartUtils from '../../models/ChartUtils'

class HeroesChart extends Component {
  getCountsByHero = (heroes, filteredMatches) => {
    const countsByHero = {}

    for (const hero of heroes) {
      countsByHero[hero] = 0
    }

    for (const match of filteredMatches) {
      for (const hero of match.heroList) {
        countsByHero[hero]++
      }
    }

    return Object.values(countsByHero)
  }

  getHeroLabels = () => {
    const playedHeroes = {}
    const heroLists = this.props.matches
      .filter(match => match.heroList.length > 0)
      .map(match => match.heroList)

    for (const heroList of heroLists) {
      for (const hero of heroList) {
        playedHeroes[hero] = hero
      }
    }

    return Heroes.filter(hero => hero in playedHeroes)
  }

  getWins = heroes => {
    const wonMatches = this.props.matches.filter(match => match.isWin())
    return this.getCountsByHero(heroes, wonMatches)
  }

  getLosses = heroes => {
    const lostMatches = this.props.matches.filter(match => match.isLoss())
    return this.getCountsByHero(heroes, lostMatches)
  }

  getDraws = heroes => {
    const drawnMatches = this.props.matches.filter(match => match.isDraw())
    return this.getCountsByHero(heroes, drawnMatches)
  }

  render() {
    const { season } = this.props
    const options = {
      scales: {
        xAxes: [{ ticks: { autoSkip: false } }],
        yAxes: [{ ticks: { callback: ChartUtils.wholeTicks } }]
      },
      responsive: true, maintainAspectRatio: false
    }
    const labels = this.getHeroLabels()
    const wins = this.getWins(labels)
    const losses = this.getLosses(labels)
    const draws = this.getDraws(labels)
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
          Wins/Losses by Hero
          <span className="text-gray text-normal h4 d-inline-block ml-2">Season {season}</span>
        </h3>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    )
  }
}

export default HeroesChart
