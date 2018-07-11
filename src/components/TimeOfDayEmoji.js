import React, { Component } from 'react'

class TimeOfDayEmoji extends Component {
  render() {
    const { timeOfDay } = this.props

    if (timeOfDay === 'morning') {
      return <span role="img" aria-label="Morning">🌅</span>
    }

    if (timeOfDay === 'evening') {
      return <span role="img" aria-label="Evening">🌆</span>
    }

    if (timeOfDay === 'afternoon') {
      return <span role="img" aria-label="Afternoon">😎</span>
    }

    if (timeOfDay === 'night') {
      return <span role="img" aria-label="Night">🌝</span>
    }

    return null
  }
}

export default TimeOfDayEmoji
