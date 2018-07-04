import React, { Component } from 'react'
import './HeroCheckbox.css'

class HeroCheckbox extends Component {
  containerClass = () => {
    const classes = ['form-checkbox', 'mb-0']
    if (!this.props.isAvailable) {
      classes.push('tooltipped')
      classes.push('tooltipped-n')
    }
    return classes.join(' ')
  }

  slugify = hero => {
    if (hero === 'D.Va') {
      return 'dva'
    }
    if (hero === 'Lúcio') {
      return 'lucio'
    }
    if (hero === 'Soldier: 76') {
      return 'soldier76'
    }
    if (hero === 'Torbjörn') {
      return 'torbjorn'
    }
    return hero.toLowerCase()
  }

  containerTooltip = () => {
    if (this.props.isAvailable) {
      return null
    }
    return 'Not available in this season'
  }

  labelClass = () => {
    const classes = ['d-flex', 'flex-items-center']
    if (!this.props.isAvailable) {
      classes.push('disabled')
    }
    return classes.join(' ')
  }

  nameClass = () => {
    const { hero, isAvailable } = this.props
    const classes = [`text-${this.slugify(hero)}`]
    if (!isAvailable) {
      classes.push('disabled-hero')
    }
    return classes.join(' ')
  }

  render() {
    const { isAvailable, isChecked, hero } = this.props
    const domID = `hero-${this.slugify(hero)}`

    return (
      <div
        className={this.containerClass()}
        aria-label={this.containerTooltip()}
      >
        <label
          htmlFor={domID}
          className={this.labelClass()}
        >
          <input
            disabled={!isAvailable}
            checked={isChecked}
            value={hero}
            id={domID}
            type="checkbox"
          />
          <div className="no-wrap">
            <span className={this.nameClass()}>{hero}</span>
          </div>
        </label>
      </div>
    )
  }
}

export default HeroCheckbox
