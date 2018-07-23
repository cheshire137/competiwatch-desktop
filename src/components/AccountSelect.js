import React, { Component } from 'react'
import Account from '../models/Account'
import enhanceWithClickOutside from 'react-click-outside'

class AccountSelect extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  refreshActiveAccount = () => {
    const { activeAccountID } = this.props
    if (!activeAccountID) {
      return
    }

    Account.find(activeAccountID).then(account => {
      this.setState(prevState => ({ activeAccount: account }))
    })
  }

  componentDidMount() {
    this.refreshActiveAccount()
  }

  componentDidUpdate(prevProps) {
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

  toggleOpen = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  onToggleButtonClick = event => {
    event.target.blur()
    this.toggleOpen()
  }

  handleClickOutside() {
    if (this.state.isOpen) {
      this.toggleOpen()
    }
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

  manageAccounts = event => {
    this.setState(prevState => ({ isOpen: false }))
    this.props.onPageChange(event)
  }

  render() {
    const { accounts } = this.props
    if (accounts.length < 1) {
      return null
    }

    const { activeAccount } = this.state
    return (
      <div className={this.containerClass()}>
        <button
          className={this.toggleButtonClass()}
          type="button"
          onClick={this.onToggleButtonClick}
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
              <button
                className="select-menu-item text-bold text-left width-full btn-link"
                type="button"
                name="accounts"
                onClick={this.manageAccounts}
              >
                <span className="ion ion-ios-checkmark select-menu-item-icon" />
                <span className="select-menu-item-text">Manage accounts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(AccountSelect)
