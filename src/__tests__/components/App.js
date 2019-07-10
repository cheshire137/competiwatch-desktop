import React from 'react'
import ReactDOM from 'react-dom'

global.window.ipcRenderer = {
  once: () => null,
  send: () => null
}
global.window.remote = () => null
jest.mock('is-electron', () => ({
  __esModule: true,
  default: () => true
}))
import App from '../../App'

it('renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
