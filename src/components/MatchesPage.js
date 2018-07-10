import React, { Component } from 'react'
import MatchesList from './MatchesList'
import Account from '../models/Account'

const totalPlacementMatches = 10

class MatchesPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: 0 }
  }

  refreshAccount = () => {
    const { dbAccounts, accountID } = this.props
    Account.find(dbAccounts, accountID).then(account => {
      this.setState(prevState => ({ account }))
    })
  }

  componentDidMount() {
    this.refreshAccount()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accountID !== this.props.accountID) {
      this.refreshAccount()
    }
  }

  onMatchCreation = () => {
    this.setState(prevState => ({ totalMatches: prevState.totalMatches + 1 }))
  }

  onMatchesLoad = totalMatches => {
    this.setState(prevState => ({ totalMatches }))

    const isPlacement = totalMatches < totalPlacementMatches
    const isLastPlacement = totalMatches === totalPlacementMatches - 1

    this.props.setIsPlacement(isPlacement, isLastPlacement)
  }

  render() {
    const { dbMatches, accountID, onPageChange, season } = this.props
    const { totalMatches } = this.state

    return (
      <div className="container layout-children-container">
        <MatchesList
          totalMatches={totalMatches}
          db={dbMatches}
          season={season}
          accountID={accountID}
          onLoad={this.onMatchesLoad}
          onPageChange={onPageChange}
        />
      </div>
    )
  }
}

export default MatchesPage
