import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import TestHelpers from '../../TestHelpers'

jest.mock('electron', () => ({
  ipcRenderer: {
    once: (replyTo, handler) => {
      if (replyTo.indexOf('find-one') === 0) {
        handler(null, null, { _id: '123', battletag: 'MarchHare' })
      } else {
        const totalMatches = 10
        handler(null, null, totalMatches)
      }
    },
    send: () => null
  }
}))
import ImportPage from '../../components/ImportPage'

it('displays warning when account has matches in that season', async () => {
  const wrapper = shallow(<ImportPage accountID="123" season="3" />)
  await TestHelpers.waitForStateProperty(wrapper, 'account')
  const warnEl = wrapper.find('.flash-warn')
  expect(warnEl.text()).toMatch(/Importing matches will delete your 10 matches in season 3./)
})
