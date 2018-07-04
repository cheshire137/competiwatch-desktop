import React, { Component } from 'react'
import Account from '../models/Account'
import AccountListItem from './AccountListItem'

class AccountsList extends Component {
  constructor(props) {
    super(props)
    this.state = { accounts: [] }
  }

  refreshAccounts = () => {
    const { db, onLoad } = this.props
    Account.findAll(db).then(accounts => {
      this.setState(prevState => ({ accounts }))
      onLoad(accounts.length)
    })
  }

  componentDidMount() {
    this.refreshAccounts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalAccounts != this.props.totalAccounts) {
      this.refreshAccounts()
    }
  }

  render() {
    const { accounts } = this.state
    const { totalAccounts } = this.props
    return (
      <div className="mb-4">
        <h2
          className="h2 text-normal mb-2 d-flex flex-items-center"
        >Accounts <span className="Counter ml-2 h4 px-2">{totalAccounts}</span></h2>
        <ul className="list-style-none">
          {accounts.map(account => (
            <AccountListItem
              key={account._id}
              db={this.props.db}
              {...account}
              onDelete={this.refreshAccounts}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default AccountsList
