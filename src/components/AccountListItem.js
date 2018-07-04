import React, { Component } from 'react'
import AccountDeleteForm from './AccountDeleteForm'

class AccountListItem extends Component {
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
    const { battletag, _id, db, onDelete } = this.props
    return (
      <li className={this.outerClass()}>
        <button
          type="button"
          className="btn-link f3"
          onClick={this.loadMatchesForAccount}
        >{battletag}</button>
        <AccountDeleteForm
          _id={_id}
          db={db}
          onDelete={onDelete}
          battletag={battletag}
        />
      </li>
    )
  }
}

export default AccountListItem
