import React, { Component } from 'react'
import AccountDeleteForm from './AccountDeleteForm'
import Account from '../models/Account'

class AccountListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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

  componentDidMount() {
    const { _id, dbMatches } = this.props
    const account = new Account({ _id })
    account.latestMatch(dbMatches).then(match => {
      this.setState(prevState => ({ latestMatch: match }))
    })
  }

  render() {
    const { battletag, _id, dbAccounts, dbMatches, onDelete } = this.props
    const { latestMatch } = this.state

    return (
      <li className={this.outerClass()}>
        <div className="d-flex flex-items-center">
          <button
            type="button"
            className="btn-link f3"
            onClick={this.loadMatchesForAccount}
          >{battletag}</button>
        </div>
        {latestMatch ? (
          <div className="text-gray">SR: {latestMatch.rank}</div>
        ) : ''}
        <AccountDeleteForm
          _id={_id}
          dbAccounts={dbAccounts}
          onDelete={onDelete}
          battletag={battletag}
          dbMatches={dbMatches}
        />
      </li>
    )
  }
}

export default AccountListItem
