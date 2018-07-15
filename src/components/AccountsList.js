import React, { Component } from 'react'
import Account from '../models/Account'
import AccountListItem from './AccountListItem'

class AccountsList extends Component {
  render() {
    const { loadMatchesForAccount, dbAccounts,
            dbMatches, season, accounts } = this.props
    const totalAccounts = accounts.length

    return (
      <div className="mb-4">
        <h2
          className="h2 text-normal mb-2 d-flex flex-items-center"
        >Battle.net accounts <span className="Counter ml-2 h4 px-2">{totalAccounts}</span></h2>
        <ul className="list-style-none">
          {accounts.map(account => (
            <AccountListItem
              key={account._id}
              dbAccounts={dbAccounts}
              dbMatches={dbMatches}
              season={season}
              {...account}
              onDelete={this.refreshAccounts}
              loadMatchesForAccount={loadMatchesForAccount}
            />
          ))}
          {accounts.length < 1 ? (
            <li>
              No accounts have been added
            </li>
          ) : ''}
        </ul>
      </div>
    )
  }
}

export default AccountsList
