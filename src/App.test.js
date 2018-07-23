import React from 'react'
import ReactDOM from 'react-dom'

jest.mock('electron', () => ({
  ipcRenderer: {
    once: () => null,
    send: () => null
  },
  remote: () => null
}))
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
