import React, { Component } from 'react'
import MatchesList from './MatchesList'
import LoadingPage from './LoadingPage'
import Account from '../models/Account'

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
      this.setState(prevState => ({ totalMatches: -1 }))
      this.refreshAccount()
    } else if (prevProps.season !== this.props.season) {
      this.setState(prevState => ({ totalMatches: -1 }))
    }
  }

  onMatchCreation = () => {
    this.setState(prevState => ({ totalMatches: prevState.totalMatches + 1 }))
  }

  getTotalPlacementMatches = () => {
    const { season } = this.props
    if (season < 18) { // no role queue in seasons 1-17
      return 10;
    }
    return 5; // role queue introduced with season 18, dropping placement match count
  }

  onMatchesLoad = totalMatches => {
    this.setState(prevState => ({ totalMatches }))

    const totalPlacementMatches = this.getTotalPlacementMatches()
    const isPlacement = totalMatches < totalPlacementMatches
    const isLastPlacement = totalMatches === totalPlacementMatches - 1

    this.props.setIsPlacement(isPlacement, isLastPlacement)
  }

  render() {
    const { totalMatches, account } = this.state
    if (!account) {
      return <LoadingPage />
    }

    const { onPageChange, season, scrollToMatch, scrollToMatchID } = this.props
    return (
      <div className="container layout-children-container">
        <MatchesList
          totalMatches={totalMatches}
          season={season}
          account={account}
          onLoad={this.onMatchesLoad}
          onPageChange={onPageChange}
          scrollToMatch={scrollToMatch}
          scrollToMatchID={scrollToMatchID}
        />
      </div>
    )
  }
}

export default MatchesPage
