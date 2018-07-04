import React, { Component } from 'react'
import HeroCheckbox from './HeroCheckbox'
import './HeroSelect.css'

const dpsHeroes = ['Pharah', 'Reaper', 'Doomfist', 'Junkrat']
const flankerHeroes = ['Genji', 'Sombra', 'Tracer']
const hitscanHeroes = ['McCree', 'Soldier: 76', 'Widowmaker']
const tankHeroes = ['Orisa', 'Reinhardt', 'Winston']
const offTankHeroes = ['D.Va', 'Roadhog', 'Wrecking Ball', 'Zarya']
const defenseHeroes = ['Bastion', 'Hanzo', 'Mei', 'Symmetra', 'Torbjörn']
const healerHeroes = ['Ana', 'Brigitte', 'Lúcio', 'Mercy', 'Moira', 'Zenyatta']
const firstSeasons = {
  Moira: 7,
  Brigitte: 10,
  Orisa: 4,
  Doomfist: 5,
  Sombra: 2,
  'Wrecking Ball': 11
}

class HeroSelect extends Component {
  isAvailable = hero => {
    if (!(hero in firstSeasons)) {
      return true
    }
    return firstSeasons[hero] <= this.props.season
  }

  isChecked = hero => {
    const heroList = this.props.heroes.split(',').map(str => str.trim())
    return heroList.indexOf(hero) > -1
  }

  render() {
    const { heroes } = this.props

    return (
      <div className="d-flex flex-wrap flex-justify-between">
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">DPS</h5>
          {dpsHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Hitscan</h5>
          {hitscanHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Flankers</h5>
          {flankerHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Tanks</h5>
          {tankHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
          {offTankHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Healers</h5>
          {healerHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Defense</h5>
          {defenseHeroes.map(hero => (
            <HeroCheckbox
              key={hero}
              isAvailable={this.isAvailable(hero)}
              isChecked={this.isChecked(hero)}
              hero={hero}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default HeroSelect
