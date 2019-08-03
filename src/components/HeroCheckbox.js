import React, { Component } from 'react'
import HeroImage from './HeroImage'
import HeroUtil from '../models/HeroUtil'
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

  labelClass = () => {
    const classes = ['d-flex', 'flex-items-center']
    if (!this.props.isAvailable) {
      classes.push('disabled')
    }
    return classes.join(' ')
  }

  nameClass = () => {
    const { hero, isAvailable } = this.props
    const classes = [`text-${HeroUtil.slugify(hero)}`]
    if (!isAvailable) {
      classes.push('disabled-hero')
    }
    return classes.join(' ')
  }

  onChange = event => {
    this.props.onToggle(this.props.hero, event.target.checked)
  }

  render() {
    const { isAvailable, isChecked, hero, unavailableReason } = this.props
    const domID = `hero-${HeroUtil.slugify(hero)}`

    return (
      <div
        className={this.containerClass()}
        aria-label={unavailableReason}
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
          <HeroImage
            hero={hero}
            className="d-inline-block rounded-2 flex-shrink-0 mx-2"
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
