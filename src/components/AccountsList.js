import React, { Component } from 'react'
import Account from '../models/Account'

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
          <li key={account._id}>
            {account.battletag}
          </li>
        ))}
      </ul>
    )
  }
}

export default AccountsList
