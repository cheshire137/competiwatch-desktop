import React, { Component } from 'react'
import MatchForm from './MatchForm'
import Account from '../models/Account'

class MatchFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: 0 }
  }

  componentDidMount() {
    const { dbAccounts, accountID } = this.props
    Account.find(dbAccounts, accountID).then(account => {
      this.setState(prevState => ({ account }))
    })
  }

  onMatchCreation = () => {
    this.setState(prevState => ({ totalMatches: prevState.totalMatches + 1 }))
    this.props.onPageChange('matches')
  }

  render() {
    const { dbMatches, accountID, latestRank, isPlacement,
            isLastPlacement, season } = this.props
    const { account } = this.state

    return (
      <div className="container layout-children-container">
        <MatchForm
          season={season}
          accountID={accountID}
          db={dbMatches}
          isPlacement={isPlacement}
          isLastPlacement={isLastPlacement}
          latestRank={latestRank}
          onCreate={this.onMatchCreation}
        />
      </div>
    )
  }
}

export default MatchFormPage
