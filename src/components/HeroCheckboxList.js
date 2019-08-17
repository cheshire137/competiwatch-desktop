import React, { Component } from 'react'
import HeroCheckbox from './HeroCheckbox'

class HeroCheckboxList extends Component {
  render() {
    const { heroes, getUnavailableReason, isChecked, onToggle, roleAvailable } = this.props
    if (!roleAvailable) {
      return null
    }

    return (
      <div>
        {heroes.map(hero => {
          const unavailableReason = getUnavailableReason(hero)
          return (
            <HeroCheckbox
              key={hero}
              isAvailable={typeof unavailableReason !== 'string'}
              unavailableReason={unavailableReason}
              isChecked={isChecked(hero)}
              onToggle={onToggle}
              hero={hero}
            />
          )
        })}
      </div>
    )
  }
}

export default HeroCheckboxList
