import React, { Component } from 'react'
import AccountForm from './AccountForm'
import AccountsList from './AccountsList'

class AccountsPage extends Component {
  render() {
    const { dbAccounts } = this.props
    return (
      <div>
        <AccountsList
          db={dbAccounts}
        />
        <AccountForm
          db={dbAccounts}
        />
      </div>
    )
  }
}

export default AccountsPage
