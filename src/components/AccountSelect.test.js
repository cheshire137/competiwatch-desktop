import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import TestHelpers from '../../test/TestHelpers'

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

it('renders', async () => {
  const div = document.createElement('div')
  const wrapper = shallow(<AccountSelect accounts={accounts} activeAccountID="123" />).dive()
  await TestHelpers.waitForStateProperty(wrapper, 'activeAccount')
  const button = wrapper.find('.select-menu-button')
  expect(button.text()).toBe('MarchHare')
})
