import React, { Component } from 'react'
import Account from '../models/Account'
import AccountListItem from './AccountListItem'

class AccountsList extends Component {
  render() {
    const { onAccountChange, dbAccounts, onDelete,
            dbMatches, season, accounts } = this.props
    if (typeof season !== 'number' || isNaN(season)) {
      return (
        <div className="blankslate">
          <h1>
            <span className="ion ion-md-refresh mr-3 ion-spin" />
            Loading...
          </h1>
        </div>
      )
    }

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
              account={account}
              onDelete={onDelete}
              onAccountChange={onAccountChange}
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
