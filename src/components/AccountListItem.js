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

  refreshLatestMatch = () => {
    const { _id, dbMatches, season } = this.props
    const account = new Account({ _id })
    account.latestMatch(dbMatches, season).then(match => {
      this.setState(prevState => ({ latestMatch: match }))
    })
  }

  componentDidMount() {
    this.refreshLatestMatch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season) {
      this.refreshLatestMatch()
    }
  }

  render() {
    const { battletag, _id, dbAccounts, dbMatches, onDelete } = this.props
    const { latestMatch } = this.state

    return (
      <li className={this.outerClass()}>
        <div className="d-flex flex-items-center flex-justify-between">
          <button
            type="button"
            className="btn-link f3"
            onClick={this.loadMatchesForAccount}
          >{battletag}</button>
          <AccountDeleteForm
            _id={_id}
            dbAccounts={dbAccounts}
            onDelete={onDelete}
            battletag={battletag}
            dbMatches={dbMatches}
          />
        </div>
        <div className="text-gray">
          {latestMatch ? (
            <span>
              {typeof latestMatch.rank === 'number' ? (
                <span>SR: {latestMatch.rank}</span>
              ) : (
                <span>Last match: {latestMatch.result}</span>
              )}
            </span>
          ) : (
            <span>No matches</span>
          )}
        </div>
      </li>
    )
  }
}

export default AccountListItem
