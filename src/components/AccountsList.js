import React, { Component } from 'react'
import AccountListItem from './AccountListItem'

class AccountsList extends Component {
  render() {
    const { onAccountChange, onDelete, season, accounts } = this.props

    return (
      <ul className="list-style-none mb-4">
        {accounts.map(account => (
          <AccountListItem
            key={account._id}
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
    )
  }
}

export default AccountsList
