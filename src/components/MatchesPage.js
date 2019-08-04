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

  onMatchesLoad = totalMatches => {
    this.setState(prevState => ({ totalMatches }))
  }

  render() {
    const { totalMatches, account } = this.state
    if (!account) {
      return <LoadingPage />
    }

    const { onPageChange, season, scrollToMatch, scrollToMatchID, theme } = this.props
    return (
      <div className="container layout-children-container">
        <MatchesList
          totalMatches={totalMatches}
          season={season}
          account={account}
          theme={theme}
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
