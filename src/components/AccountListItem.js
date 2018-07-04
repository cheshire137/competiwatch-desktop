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

  render() {
    const { battletag } = this.props
    return (
      <li>
        <button
          type="button"
          className="btn-link"
          onClick={this.loadMatchesForAccount}
        >{battletag}</button>
        <form onSubmit={this.deleteAccount} className="d-inline-block ml-4">
          <button
            type="submit"
            className="btn-link tooltipped tooltipped-n text-gray-dark text-bold"
            aria-label="Delete this account"
          >&times;</button>
        </form>
      </li>
    )
  }
}

export default AccountListItem
