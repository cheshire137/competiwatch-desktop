import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import LoadingPage from '../../components/LoadingPage'

it('matches snapshot', () => {
  const tree = renderer.create(<LoadingPage />).toJSON()
  expect(tree).toMatchSnapshot()
})
