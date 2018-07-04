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
        <form onSubmit={this.deleteAccount}>
          <button type="submit">&times;</button>
        </form>
      </li>
    )
  }
}

export default AccountListItem
