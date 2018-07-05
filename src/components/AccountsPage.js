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
            loadMatchFormForAccount } = this.props
    const { totalAccounts } = this.state

    return (
      <div className="container layout-children-container">
        <div className="clearfix">
          <div className="col-8 float-left">
            <AccountsList
              dbAccounts={dbAccounts}
              dbMatches={dbMatches}
              onLoad={this.onAccountsLoad}
              totalAccounts={totalAccounts}
              loadMatchesForAccount={loadMatchesForAccount}
              loadMatchFormForAccount={loadMatchFormForAccount}
            />
          </div>
          <div className="col-4 float-left">
            <AccountForm
              db={dbAccounts}
              onCreate={this.onAccountCreation}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AccountsPage
