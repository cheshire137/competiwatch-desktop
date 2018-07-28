import React from 'react'
import ReactDOM from 'react-dom'

jest.mock('react-chartjs-2', () => ({ Pie: () => null }))
import WinLossChart from '../components/WinLossChart'

it('renders', () => {
  const div = document.createElement('div')
  const matches = [
    { isWin: () => true, isLoss: () => false, isDraw: () => false },
    { isWin: () => false, isLoss: () => true, isDraw: () => false },
    { isWin: () => false, isLoss: () => false, isDraw: () => true },
  ]
  const season = 11
  ReactDOM.render(<WinLossChart matches={matches} season={season} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
