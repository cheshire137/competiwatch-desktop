import React, { Component } from 'react'
import MatchForm from './MatchForm'

class MatchCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: 0 }
  }

  onMatchCreation = () => {
    this.setState(prevState => ({ totalMatches: prevState.totalMatches + 1 }))
    this.props.onPageChange('matches', true)
  }

  loadLatestSeason = event => {
    const { latestSeason, onSeasonChange } = this.props

    event.currentTarget.blur()
    onSeasonChange(latestSeason)
  }

  render() {
    const { accountID, latestRank, isPlacement, latestSeason,
            isLastPlacement, season } = this.props

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
          isPlacement={isPlacement}
          isLastPlacement={isLastPlacement}
          latestRank={latestRank}
          onCreate={this.onMatchCreation}
        />
      </div>
    )
  }
}

export default MatchCreatePage
