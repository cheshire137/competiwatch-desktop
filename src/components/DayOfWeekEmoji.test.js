import React from 'react'
import ReactDOM from 'react-dom'
import DayOfWeekEmoji from './DayOfWeekEmoji'

it('renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DayOfWeekEmoji dayOfWeek="weekend" />, div)
  ReactDOM.unmountComponentAtNode(div)
})
