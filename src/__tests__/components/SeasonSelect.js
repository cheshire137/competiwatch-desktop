import React from 'react'
import ReactDOM from 'react-dom'
import SeasonSelect from '../../components/SeasonSelect'

it('renders', () => {
  const div = document.createElement('div')
  const latestSeason = 11
  const activeSeason = 10
  ReactDOM.render(<SeasonSelect activeSeason={activeSeason} latestSeason={latestSeason} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
