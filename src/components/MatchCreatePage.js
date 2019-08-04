import React, { Component } from 'react'
import Match from '../models/Match'
import MatchForm from './MatchForm'

class MatchCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  refreshMatches = () => {
    const {accountID, season} = this.props

    Match.findAll(accountID, season).then(matches => {
      this.setState(prevState => ({matches}))
    })
  }

  componentDidMount() {
    this.refreshMatches()
  }

  onMatchCreation = () => {
    this.props.onPageChange('matches', true)
  }

  loadLatestSeason = event => {
    const { latestSeason, onSeasonChange } = this.props

    event.currentTarget.blur()
    onSeasonChange(latestSeason)
  }

  render() {
    const { matches } = this.state
    if (!matches) {
      return null
    }

    const { accountID, latestRank, latestSeason, latestGroup,
            season, theme } = this.props
    return (
      <div className="container layout-children-container">
        {season < latestSeason ? (
          <p className="flash flash-warn">
            You are logging a match for a past competitive season. Did you want
            <span> to </span>
            <button
              type="button"
              className="btn-link"
              onClick={this.loadLatestSeason}
            >log a match in season {latestSeason}</button>?
          </p>
        ) : null}
        <MatchForm
          season={season}
          accountID={accountID}
          latestRank={latestRank}
          latestGroup={latestGroup}
          theme={theme}
          onCreate={this.onMatchCreation}
          priorMatches={matches}
        />
      </div>
    )
  }
}

export default MatchCreatePage
