import React, { Component } from 'react'
import AccountForm from './AccountForm'
import AccountsList from './AccountsList'

class AccountsPage extends Component {
  render() {
    const { dbAccounts, dbMatches, onAccountChange, season,
            accounts, onDelete } = this.props

    return (
      <div className="container layout-children-container">
        <div className="col-8">
          <AccountsList
            dbAccounts={dbAccounts}
            dbMatches={dbMatches}
            season={season}
            accounts={accounts}
            onDelete={onDelete}
            onAccountChange={onAccountChange}
          />
          <AccountForm
            db={dbAccounts}
            onCreate={this.props.onCreate}
            totalAccounts={accounts.length}
          />
        </div>
      </div>
    )
  }
}

export default AccountsPage
