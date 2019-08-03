import React, { Component } from 'react'
import Hero from '../models/Hero'
import HeroCheckboxList from './HeroCheckboxList'
import RoleImage from './RoleImage'
import './HeroSelect.css'

class HeroSelect extends Component {
  getUnavailableReason = hero => {
    const { role, season } = this.props
    if (hero in Hero.firstSeasons && Hero.firstSeasons[hero] > season) {
      return 'Not available in this season'
    }
    if (role in Hero.byRole && Hero.byRole[role].indexOf(hero) < 0) {
      return `Not a ${role.toLowerCase()} hero`
    }
    return
  }

  isChecked = hero => {
    const heroList = this.props.heroes.split(',').map(str => str.trim())
    return heroList.indexOf(hero) > -1
  }

  unavailableClass = displayedRole => {
    const { role } = this.props
    if (typeof role === 'string' && role.length > 0 && role.toLowerCase() !== displayedRole) {
      return 'role-unavailable'
    }
  }

  render() {
    const { onToggle } = this.props

    return (
      <div className="d-flex flex-wrap flex-justify-between">
        <div className="hero-box mb-3">
          <h5 className={`h5 border-bottom pb-1 mb-2 ${this.unavailableClass('damage')}`}>
            <RoleImage role="damage" size="12" className="d-inline-block mr-1" />
            Flankers
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType.Flanker}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
          <h5 className={`h5 border-bottom pb-1 mt-4 mb-2 ${this.unavailableClass('tank')}`}>
            <RoleImage role="tank" size="12" className="d-inline-block mr-1" />
            Off-tanks
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType['Off-tank']}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
          <h5 className={`h5 border-bottom pb-1 mt-4 mb-2 ${this.unavailableClass('support')}`}>
            <RoleImage role="support" size="12" className="d-inline-block mr-1" />
            Off-healers
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType['Off-healer']}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-3">
          <h5 className={`h5 border-bottom pb-1 mb-2 ${this.unavailableClass('damage')}`}>
            <RoleImage role="damage" size="12" className="d-inline-block mr-1" />
            Hitscan
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType.Hitscan}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
          <h5 className={`h5 border-bottom pb-1 mt-4 mb-2 ${this.unavailableClass('tank')}`}>
            <RoleImage role="tank" size="12" className="d-inline-block mr-1" />
            Main tanks
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType['Main Tank']}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
          <h5 className={`h5 border-bottom pb-1 mb-2 mt-4 ${this.unavailableClass('support')}`}>
            <RoleImage role="support" size="12" className="d-inline-block mr-1" />
            Main healers
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType['Main Healer']}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
        <div className="hero-box mb-3">
          <h5 className={`h5 border-bottom pb-1 mb-2 ${this.unavailableClass('damage')}`}>
            <RoleImage role="damage" size="12" className="d-inline-block mr-1" />
            DPS
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType.DPS}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
          <h5 className={`h5 border-bottom pb-1 mt-4 mb-2 ${this.unavailableClass('damage')}`}>
            <RoleImage role="damage" size="12" className="d-inline-block mr-1" />
            Defense
          </h5>
          <HeroCheckboxList
            heroes={Hero.byType.Defense}
            getUnavailableReason={this.getUnavailableReason}
            isChecked={this.isChecked}
            onToggle={onToggle}
          />
        </div>
      </div>
    )
  }
}

export default HeroSelect
