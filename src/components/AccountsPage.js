import React, { Component } from 'react'
import AccountForm from './AccountForm'
import AccountsList from './AccountsList'

class AccountsPage extends Component {
  render() {
    const { onAccountChange, onAccountUpdate, season, accounts, onDelete } = this.props

    return (
      <div className="container layout-children-container">
        <div className="col-lg-7 col-md-10 col-sm-12 mb-4">
          <h2
            className="h2 text-normal mb-2 d-flex flex-items-center"
          >Battle.net accounts <span className="Counter ml-2 h4 px-2">{accounts.length}</span></h2>
          <p>Choose an account to view and log competitive matches.</p>
          <AccountsList
            season={season}
            accounts={accounts}
            onDelete={onDelete}
            onAccountChange={onAccountChange}
            onAccountUpdate={onAccountUpdate}
          />
          <h2
            className="h2 text-normal mb-2 border-top mt-4 pt-3"
          >Add an account</h2>
          <p>Add an account to log the competitive matches you've played on that account.</p>
          <div className="pb-3">
            <AccountForm
              onCreate={this.props.onCreate}
              totalAccounts={accounts.length}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AccountsPage
