import React from 'react'
import ReactDOM from 'react-dom'
import HeroImage from '../components/HeroImage'

it('renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<HeroImage hero="Mercy" className="p-3" />, div)
  ReactDOM.unmountComponentAtNode(div)
})
