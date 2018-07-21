import React, { Component } from 'react'
import LoadingPage from './LoadingPage'
import WinLossChart from './WinLossChart'
import Match from '../models/Match'
import './TrendsPage.css'

class TrendsPage extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: [], hasLoaded: false }
  }

  refreshMatches = () => {
    const { accountID, season } = this.props

    Match.findAll(accountID, season).then(matches => {
      this.setState(prevState => ({ matches, hasLoaded: true }))
    })
  }

  componentDidMount() {
    this.refreshMatches()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season ||
        prevProps.accountID !== this.props.accountID) {
      this.refreshMatches()
    }
  }

  render() {
    const { matches, hasLoaded } = this.state
    if (!hasLoaded) {
      return <LoadingPage />
    }

    const { season } = this.props

    return (
      <div className="container layout-children-container">
        <div className="col-md-5 float-md-left">
          <WinLossChart season={season} matches={matches} />
        </div>
      </div>
    )
  }
}

export default TrendsPage
