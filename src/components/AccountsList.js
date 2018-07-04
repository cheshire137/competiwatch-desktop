import React, { Component } from 'react'
import Account from '../models/Account'
import AccountListItem from './AccountListItem'

class AccountsList extends Component {
  constructor(props) {
    super(props)
    this.state = { accounts: [] }
  }

  refreshAccounts = () => {
    Account.findAll(this.props.db).then(accounts => {
      this.setState(prevState => ({ accounts }))
    })
  }

  componentDidMount() {
    this.refreshAccounts()
  }

  render() {
    const { accounts } = this.state
    return (
      <ul>
        {accounts.map(account => (
          <AccountListItem
            key={account._id}
            db={this.props.db}
            {...account}
            onDelete={this.refreshAccounts}
          />
        ))}
      </ul>
    )
  }
}

export default AccountsList
