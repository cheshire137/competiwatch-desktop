import React, { Component } from 'react'

class DayOfWeekEmoji extends Component {
  render() {
    const { dayOfWeek } = this.props

    if (dayOfWeek === 'weekend') {
      return <span role="img" aria-label="Weekend">🎉</span>
    }

    if (dayOfWeek === 'weekday') {
      return <span role="img" aria-label="Weekday">👔</span>
    }

    return null
  }
}

export default DayOfWeekEmoji
