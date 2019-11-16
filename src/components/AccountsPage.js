import React, { Component } from 'react'
import AccountForm from './AccountForm';
import AccountsList from './AccountsList'

class AccountsPage extends Component {
  render() {
    const { onAccountChange, onAccountUpdate, season, accounts, onDelete } = this.props

    return (
      <div className="container layout-children-container">
        {accounts.length < 1 ? (
          <div className="Box mb-4 p-3 col-lg-6">
            <h2
              className="Subhead-heading mb-2"
            >
              <span role="img" className="mr-2 d-inline-block" aria-label="Tada">🎉</span>
              Welcome to Competiwatch!
            </h2>
            <div className="f4">
              Thanks for using the app! To get started, add a Battle.net
              account below and log some games.
            </div>
          </div>
        ) : null}
        <div className="clearfix">
          {accounts.length > 0 ? (
            <div className="float-left col-lg-7 col-md-12 col-sm-12 mb-4">
              <div className="mr-4 pr-4">
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
              </div>
            </div>
          ) : null}
          <div className="float-left col-lg-5 col-md-12 col-sm-12 mb-4">
            <h2
              className="h2 text-normal mb-2"
            >{accounts.length > 0 ? 'Add another account' : 'Add an account'}</h2>
            {accounts.length < 1 ? (
              <p>Add an account to begin logging competitive matches.</p>
            ) : null}
            <AccountForm
              onCreate={this.props.onCreate}
              totalAccounts={accounts.length}
              buttonClass={accounts.length > 0 ? '' : 'btn-primary'}
            />
            <div className="pb-3">
              {accounts.length > 0 ? (
                <p className="note">
                  <strong>Tip:</strong> the numbers at the end aren't required.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountsPage
