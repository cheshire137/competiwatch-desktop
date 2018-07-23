import React from 'react'
import ReactDOM from 'react-dom'
import SettingsForm from './SettingsForm'

it('renders', () => {
  const div = document.createElement('div')
  const settings = {}
  const accounts = []
  ReactDOM.render(<SettingsForm settings={settings} accounts={accounts} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
