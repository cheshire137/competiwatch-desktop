import React, { Component } from 'react'
import AccountDeleteForm from './AccountDeleteForm'
import Account from '../models/Account'
import MatchRankImage from './MatchRankImage'
import './AccountListItem.css'

class AccountListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: -1 }
  }

  viewAccountMatches = event => {
    event.target.blur()
    this.props.loadMatchesForAccount(this.props._id)
  }

  refreshMatchData = () => {
    const { _id, dbMatches, season } = this.props
    const account = new Account({ _id })

    account.latestMatch(dbMatches, season).then(match => {
      this.setState(prevState => ({ latestMatch: match }))
    })

    account.totalMatches(dbMatches).then(count => {
      this.setState(prevState => ({ totalMatches: count }))
    })
  }

  componentDidMount() {
    this.refreshMatchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season) {
      this.refreshMatchData()
    }
  }

  render() {
    const { battletag, _id, dbAccounts, dbMatches, onDelete } = this.props
    const { latestMatch, totalMatches } = this.state

    return (
      <li className="Box mb-3 p-3">
        <div className="d-flex flex-items-center flex-justify-between">
          <button
            type="button"
            className="btn-link h2 text-bold"
            onClick={this.viewAccountMatches}
          >{battletag}</button>
          <AccountDeleteForm
            _id={_id}
            dbAccounts={dbAccounts}
            onDelete={onDelete}
            battletag={battletag}
            dbMatches={dbMatches}
          />
        </div>
        <div className="text-gray account-meta d-flex flex-items-center">
          {latestMatch && typeof latestMatch.rank === 'number' ? (
            <span className="d-flex flex-items-center">
              <MatchRankImage
                rank={latestMatch.rank}
                className="d-inline-block mr-1 hide-sm"
              />
              {latestMatch.rank}
            </span>
          ) : latestMatch && latestMatch.result ? (
            <span>Last match: {latestMatch.result}</span>
          ) : null}
          {latestMatch && latestMatch.playedAt ? (
            <span>Last played {latestMatch.playedAt.toLocaleDateString()}</span>
          ) : latestMatch && latestMatch.createdAt ? (
            <span>Last logged {latestMatch.createdAt.toLocaleDateString()}</span>
          ) : null}
          {totalMatches > 0 ? (
            <span>{totalMatches} match{totalMatches === 1 ? null : 'es'}</span>
          ) : (
            <span>No matches</span>
          )}
        </div>
      </li>
    )
  }
}

export default AccountListItem
