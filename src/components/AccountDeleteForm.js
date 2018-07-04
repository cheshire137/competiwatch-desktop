import React, { Component } from 'react'
import Account from '../models/Account'

class AccountDeleteForm extends Component {
  constructor(props) {
    super(props)
    this.state = { showForm: false }
  }

  deleteAccount = event => {
    event.preventDefault()
    const message = `Are you sure you want to delete ${this.props.battletag}?`
    if (window.confirm(message)) {
      const { _id, dbAccounts, onDelete } = this.props
      const account = new Account({ _id })
      account.delete(dbAccounts).then(onDelete)
    }
  }

  componentDidMount() {
    const { _id, dbMatches } = this.props
    const account = new Account({ _id })
    account.hasMatches(dbMatches).then(hasMatches => {
      if (!hasMatches) {
        this.setState(prevState => ({ showForm: true }))
      }
    })
  }

  render() {
    if (!this.state.showForm) {
      return null
    }
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
