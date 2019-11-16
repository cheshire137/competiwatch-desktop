import React, { Component } from 'react'
import HeroImage from '../HeroImage'
import HeroUtil from '../../models/HeroUtil'
import './HeroCheckbox.css'

class HeroCheckbox extends Component {
  containerClass = () => {
    let classes = ['form-checkbox', 'mb-0', 'mt-1']
    if (!this.props.isAvailable) {
      classes = classes.concat(['tooltipped', 'tooltipped-n', 'unavailable-hero'])
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
    const { hero } = this.props
    const classes = [`text-${HeroUtil.slugify(hero)}`, 'hero-name']
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
