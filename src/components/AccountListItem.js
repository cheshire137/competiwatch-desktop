import React, { Component } from 'react'
import Account from '../models/Account'

class AccountListItem extends Component {
  deleteAccount = event => {
    event.preventDefault()
    const { _id, db, onDelete } = this.props
    const account = new Account({ _id })
    account.delete(db).then(onDelete)
  }

  render() {
    const { battletag } = this.props
    return (
      <li>
        {battletag}
        <form onSubmit={this.deleteAccount} className="d-inline-block ml-4">
          <button type="submit" className="btn-link">&times;</button>
        </form>
      </li>
    )
  }
}

export default AccountListItem
