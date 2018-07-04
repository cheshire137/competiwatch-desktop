import React, { Component } from 'react'
import './HeroCheckbox.css'

class HeroCheckbox extends Component {
  containerClass = () => {
    const classes = ['form-checkbox', 'mb-0', 'mt-1']
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
    if (hero === 'Wrecking Ball') {
      return 'wrecking-ball'
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

  onChange = event => {
    this.props.onToggle(this.props.hero, event.target.checked)
  }

  imageSource = () => {
    return require(`../images/heroes/${this.slugify(this.props.hero)}.png`)
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
            onChange={this.onChange}
            type="checkbox"
          />
          <img
            src={this.imageSource()}
            alt={hero}
            className="d-inline-block rounded-2 flex-shrink-0 mx-2"
            width="20"
            height="20"
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
