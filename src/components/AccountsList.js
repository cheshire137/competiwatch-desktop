import React, { Component } from 'react'
import Account from '../models/Account'
import AccountListItem from './AccountListItem'

class AccountsList extends Component {
  constructor(props) {
    super(props)
    this.state = { accounts: [] }
  }

  componentDidMount() {
    Account.findAll(this.props.db).then(accounts => {
      this.setState(prevState => ({ accounts }))
    })
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
          />
        ))}
      </ul>
    )
  }
}

export default AccountsList
