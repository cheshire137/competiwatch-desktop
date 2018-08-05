import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import HelpPage from '../../components/HelpPage'

it('matches snapshot', () => {
  const tree = renderer.create(<HelpPage />).toJSON()
  expect(tree).toMatchSnapshot()
})
