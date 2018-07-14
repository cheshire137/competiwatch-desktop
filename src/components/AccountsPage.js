import React, { Component } from 'react'
import AccountForm from './AccountForm'
import AccountsList from './AccountsList'

class AccountsPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalAccounts: 0 }
  }

  onAccountCreation = () => {
    this.setState(prevState => ({ totalAccounts: prevState.totalAccounts + 1 }))
  }

  onAccountsLoad = totalAccounts => {
    this.setState(prevState => ({ totalAccounts }))
  }

  render() {
    const { dbAccounts, dbMatches, loadMatchesForAccount,
            season } = this.props
    const { totalAccounts } = this.state

    return (
      <div className="container layout-children-container">
        <div className="col-8">
          <AccountsList
            dbAccounts={dbAccounts}
            dbMatches={dbMatches}
            onLoad={this.onAccountsLoad}
            totalAccounts={totalAccounts}
            season={season}
            loadMatchesForAccount={loadMatchesForAccount}
          />
          <AccountForm
            db={dbAccounts}
            onCreate={this.onAccountCreation}
            totalAccounts={totalAccounts}
          />
        </div>
      </div>
    )
  }
}

export default AccountsPage
