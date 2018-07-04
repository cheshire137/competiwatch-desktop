import React, { Component } from 'react'
import AccountForm from './AccountForm'
import AccountsList from './AccountsList'

class AccountsPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalAccounts: 0 }
  }

  onAccountCreation = () => {
    this.setState(prevState => ({ totalAccounts: prevState.totalAccounts + 1 }))
  }

  onAccountsLoad = totalAccounts => {
    this.setState(prevState => ({ totalAccounts }))
  }

  render() {
    const { dbAccounts } = this.props
    const { totalAccounts } = this.state

    return (
      <div className="container layout-children-container">
        <AccountsList
          db={dbAccounts}
          onLoad={this.onAccountsLoad}
          totalAccounts={totalAccounts}
        />
        <AccountForm
          db={dbAccounts}
          onCreate={this.onAccountCreation}
        />
      </div>
    )
  }
}

export default AccountsPage
