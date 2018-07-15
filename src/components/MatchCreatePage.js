import React, { Component } from 'react'
import MatchForm from './MatchForm'

class MatchCreatePage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: 0 }
  }

  onMatchCreation = () => {
    this.setState(prevState => ({ totalMatches: prevState.totalMatches + 1 }))
    this.props.onPageChange('matches')
  }

  render() {
    const { accountID, latestRank, isPlacement,
            isLastPlacement, season } = this.props

    return (
      <div className="container layout-children-container">
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
