import React from 'react'

const DayOfWeekEmoji = (props) => {
  const { dayOfWeek } = props

  if (dayOfWeek === 'weekend') {
    return <span role="img" aria-label="Weekend">🎉</span>
  }

  if (dayOfWeek === 'weekday') {
    return <span role="img" aria-label="Weekday">👔</span>
  }

  return null
}

export default DayOfWeekEmoji
