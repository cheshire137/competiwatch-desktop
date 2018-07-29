import React, { Component } from 'react'
import Hero from '../models/Hero'
import HeroCheckboxList from './HeroCheckboxList'
import './HeroSelect.css'

class HeroSelect extends Component {
  isAvailable = hero => {
    if (!(hero in Hero.firstSeasons)) {
      return true
    }
    return Hero.firstSeasons[hero] <= this.props.season
  }

  isChecked = hero => {
    const heroList = this.props.heroes.split(',').map(str => str.trim())
    return heroList.indexOf(hero) > -1
  }

  render() {
    const { onToggle } = this.props

    return (
      <div className="d-flex flex-wrap flex-justify-between">
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">DPS</h5>
          <HeroCheckboxList
            heroes={Hero.byType.DPS}
            isAvailable={this.isAvailable}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Hitscan</h5>
          <HeroCheckboxList
            heroes={Hero.byType.Hitscan}
            isAvailable={this.isAvailable}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Flankers</h5>
          <HeroCheckboxList
            heroes={Hero.byType.Flanker}
            isAvailable={this.isAvailable}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Tanks</h5>
          <HeroCheckboxList
            heroes={Hero.byType.Tank}
            isAvailable={this.isAvailable}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Healers</h5>
          <HeroCheckboxList
            heroes={Hero.byType.Healer}
            isAvailable={this.isAvailable}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-4">
          <h5 className="h5 border-bottom pb-2 mb-2">Defense</h5>
          <HeroCheckboxList
            heroes={Hero.byType.Defense}
            isAvailable={this.isAvailable}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
      </div>
    )
  }
}

export default HeroSelect
