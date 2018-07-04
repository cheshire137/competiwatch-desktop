import React, { Component } from 'react'
import Account from '../models/Account'

class AccountListItem extends Component {
  deleteAccount = event => {
    event.preventDefault()
    const message = `Are you sure you want to delete ${this.props.battletag}?`
    if (window.confirm(message)) {
      const { _id, db, onDelete } = this.props
      const account = new Account({ _id })
      account.delete(db).then(onDelete)
    }
  }

  loadMatchesForAccount = event => {
    event.target.blur()
    this.props.loadMatchesForAccount(this.props._id)
  }

  outerClass = () => {
    if (this.props.isLast) {
      return ''
    }
    return 'border-bottom pb-2 mb-2'
  }

  render() {
    const { battletag } = this.props
    return (
      <li className={this.outerClass()}>
        <button
          type="button"
          className="btn-link f3"
          onClick={this.loadMatchesForAccount}
        >{battletag}</button>
        <form onSubmit={this.deleteAccount}>
          <button
            type="submit"
            className="btn-link text-red text-small"
          >Delete account</button>
        </form>
      </li>
    )
  }
}

export default AccountListItem
