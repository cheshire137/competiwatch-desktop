import React, { Component } from 'react'
import HeroCheckbox from './HeroCheckbox'

class HeroCheckboxList extends Component {
  render() {
    const { heroes, isAvailable, isChecked, onToggle } = this.props

    return (
      <div>
        {heroes.map(hero => (
          <HeroCheckbox
            key={hero}
            isAvailable={isAvailable(hero)}
            isChecked={isChecked(hero)}
            onToggle={onToggle}
            hero={hero}
          />
        ))}
      </div>
    )
  }
}

export default HeroCheckboxList
