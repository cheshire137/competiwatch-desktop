import React, { Component } from 'react'
import AccountDeleteForm from './AccountDeleteForm'
import CsvExporter from '../models/CsvExporter'
import MatchRankImage from './MatchRankImage'
import './AccountListItem.css'

const { dialog } = window.require('electron').remote

const dateStrFrom = date => {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month <= 9) {
    month = `0${month}`
  }
  let day = date.getDate()
  if (day <= 9) {
    day = `0${day}`
  }
  return `${year}-${month}-${day}`
}

class AccountListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: -1 }
  }

  onAccountClick = event => {
    event.target.blur()
    this.props.onAccountChange(this.props.account._id)
  }

  refreshMatchData = () => {
    const { account, season } = this.props

    account.latestMatch(season).then(match => {
      this.setState(prevState => ({ latestMatch: match }))
    })

    account.totalMatches(season).then(count => {
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

  exportSeasonTo = path => {
    const { season, account } = this.props
    const exporter = new CsvExporter(path, season, account)

    exporter.export().then(() => {
      console.log(`exported ${account.battletag}'s season ${season}`, path)
    })
  }

  exportSeason = event => {
    event.currentTarget.blur()
    const { account, season } = this.props
    const simpleBattletag = account.battletag.replace(/\s+/g, '-')
      .replace(/#+/g, '-')
    const dateStr = dateStrFrom(new Date())
    const defaultPath = `${simpleBattletag}-season-${season}-${dateStr}.csv`
    const options = { defaultPath }

    dialog.showSaveDialog(options, path => {
      if (path && path.length > 0) {
        this.exportSeasonTo(path)
      }
    })
  }

  render() {
    const { account, onDelete, season } = this.props
    const { battletag, _id } = account
    const { latestMatch, totalMatches } = this.state

    return (
      <li className="Box mb-3 p-3">
        <div className="d-flex flex-items-center flex-justify-between">
          <button
            type="button"
            className="btn-link h2 text-bold"
            onClick={this.onAccountClick}
          >{battletag}</button>
          <AccountDeleteForm
            id={_id}
            onDelete={onDelete}
            battletag={battletag}
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
            <span>No matches in season {season}</span>
          )}
          {totalMatches > 0 ? (
            <span>
              <button
                type="button"
                aria-label="Save season as a CSV file"
                className="btn-link tooltipped tooltipped-n"
                onClick={this.exportSeason}
              >Export season {season}</button>
            </span>
          ) : null}
        </div>
      </li>
    )
  }
}

export default AccountListItem
