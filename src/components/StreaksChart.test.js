import React from 'react'
import ReactDOM from 'react-dom'
jest.mock('react-chartjs-2', () => ({ Line: () => null }))
import StreaksChart from './StreaksChart'

it('renders', () => {
  const div = document.createElement('div')
  const matches = [
    { lossStreak: 1, winStreak: 0 },
    { lossStreak: 0, winStreak: 1 },
    { lossStreak: 0, winStreak: 2 }
  ]
  const season = 9
  ReactDOM.render(<StreaksChart matches={matches} season={season} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
