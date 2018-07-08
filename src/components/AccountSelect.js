import React, { Component } from 'react'
import Account from '../models/Account'

class AccountSelect extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false, accounts: [] }
  }

  refreshAccounts = () => {
    const { db } = this.props
    Account.findAll(db).then(accounts => {
      this.setState(prevState => ({ accounts }))
    })
  }

  refreshActiveAccount = () => {
    const { db, activeAccountID } = this.props
    if (!activeAccountID) {
      return
    }

    Account.find(db, activeAccountID).then(account => {
      this.setState(prevState => ({ activeAccount: account }))
    })
  }

  componentDidMount() {
    this.refreshAccounts()
    this.refreshActiveAccount()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalAccounts !== this.props.totalAccounts) {
      this.refreshAccounts()
    }
    if (prevProps.activeAccountID !== this.props.activeAccountID) {
      this.refreshActiveAccount()
    }
  }

  containerClass = () => {
    const classes = ['select-menu', 'd-inline-block']
    if (this.state.isOpen) {
      classes.push('active')
    }
    return classes.join(' ')
  }

  toggleButtonClass = () => {
    const classes = ['btn', 'select-menu-button']
    if (this.state.isOpen) {
      classes.push('selected')
    }
    return classes.join(' ')
  }

  toggleOpen = event => {
    event.target.blur()
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  accountButtonClass = accountID => {
    const classes = ['select-menu-item', 'text-left', 'width-full', 'btn-link']
    if (this.props.activeAccountID === accountID) {
      classes.push('selected')
    }
    return classes.join(' ')
  }

  onChange = event => {
    const button = event.currentTarget

    button.blur()
    this.props.onChange(button.value)
    this.setState(prevState => ({ isOpen: false }))
  }

  render() {
    const { accounts, activeAccount } = this.state

    if (accounts.length < 1) {
      return null
    }

    return (
      <div>
        <div className={this.containerClass()}>
          <button
            className={this.toggleButtonClass()}
            type="button"
            onClick={this.toggleOpen}
            aria-haspopup="true"
            aria-expanded="false"
          >
            {activeAccount ? activeAccount.battletag : 'Select an account'}
          </button>
          <div className="select-menu-modal-holder">
            <div className="select-menu-modal">
              <div className="select-menu-list">
                {accounts.map(account => (
                  <button
                    className={this.accountButtonClass(account)}
                    key={account._id}
                    type="button"
                    value={account._id}
                    onClick={this.onChange}
                  >
                    <span className="ion ion-ios-checkmark select-menu-item-icon" />
                    <span className="select-menu-item-text">{account.battletag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountSelect
