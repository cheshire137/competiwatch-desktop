import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const accounts = [
  { _id: '456', battletag: 'CheshireCat' },
  { _id: '123', battletag: 'MarchHare' }
]

jest.mock('electron', () => ({
  ipcRenderer: {
    once: (replyTo, handler) => {
      handler(null, null, { _id: '123', battletag: 'MarchHare' })
    },
    send: () => null
  }
}))
import AccountSelect from './AccountSelect'

it('matches snapshot', () => {
  const tree = renderer.create(<AccountSelect accounts={accounts} activeAccountID="123" />).toJSON()
  expect(tree).toMatchSnapshot()
})

const waitForState = (wrapper, propToBePresent) => {
  return new Promise((resolve, reject) => {
    const maxTimeWaited = 2000 // ms
    const delay = 500 // ms
    let timeWaited = 0
    let interval = null
    const checkState = () => {
      const state = wrapper.state()
      if (state[propToBePresent]) {
        clearInterval(interval)
        wrapper.update()
        resolve()
      } else {
        timeWaited = timeWaited + delay
        if (timeWaited > maxTimeWaited) {
          console.error('waited too long for', propToBePresent, 'in', state)
          clearInterval(interval)
          reject()
        }
      }
    }

    interval = setInterval(checkState, delay)
  })
}

it('renders', async () => {
  const div = document.createElement('div')
  const wrapper = shallow(<AccountSelect accounts={accounts} activeAccountID="123" />).dive()
  await waitForState(wrapper, 'activeAccount')
  const button = wrapper.find('.select-menu-button')
  expect(button.text()).toBe('MarchHare')
})
