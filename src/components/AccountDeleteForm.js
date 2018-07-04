import React, { Component } from 'react'
import Account from '../models/Account'

class AccountDeleteForm extends Component {
  deleteAccount = event => {
    event.preventDefault()
    const message = `Are you sure you want to delete ${this.props.battletag}?`
    if (window.confirm(message)) {
      const { _id, db, onDelete } = this.props
      const account = new Account({ _id })
      account.delete(db).then(onDelete)
    }
  }

  render() {
    return (
      <form onSubmit={this.deleteAccount}>
        <button
          type="submit"
          className="btn-link text-red text-small"
        >Delete account</button>
      </form>
    )
  }
}

export default AccountDeleteForm
