import React, { Component } from 'react'
import MatchesList from './MatchesList'
import Account from '../models/Account'

const totalPlacementMatches = 10

class MatchesPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: -1 }
  }

  refreshAccount = () => {
    const { accountID } = this.props

    Account.find(accountID).then(account => {
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
    const { onPageChange, season, scrollToLatestMatch } = this.props
    const { totalMatches, account } = this.state

    return (
      <div className="container layout-children-container">
        {totalMatches < 0 || !account ? (
          <div className="blankslate">
            <h1>
              <span className="ion ion-md-refresh mr-3 ion-spin" />
              Loading...
            </h1>
          </div>
        ) : null}
        {account ? (
          <MatchesList
            totalMatches={totalMatches}
            season={season}
            account={account}
            onLoad={this.onMatchesLoad}
            onPageChange={onPageChange}
            scrollToLatestMatch={scrollToLatestMatch}
          />
        ) : null}
      </div>
    )
  }
}

export default MatchesPage
