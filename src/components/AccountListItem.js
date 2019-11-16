import React, { Component } from 'react'
import isElectron from 'is-electron'
import AccountDeleteForm from './AccountDeleteForm'
import AccountForm from './AccountForm/index'
import CsvExporter from '../models/CsvExporter'
import Match from '../models/Match'
import FileUtil from '../models/FileUtil'
import MatchRankImage from './MatchRankImage'
import HeroImage from './HeroImage'
import './AccountListItem.css'

class AccountListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalMatches: -1,
      showEditForm: false,
      battletag: props.account.battletag
    }
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

    account.topHeroes(season).then(topHeroes => {
      this.setState(prevState => ({ topHeroes }))
    })
  }

  wipeSeason = () => {
    const { totalMatches } = this.state
    if (totalMatches < 0) {
      return
    }

    const unit = totalMatches === 1 ? 'match' : 'matches'
    const { account, season } = this.props
    const message = `Are you sure you want to delete all ${totalMatches} ${unit} from season ${season} for ${account.battletag}? This cannot be undone.`
    if (!window.confirm(message)) {
      return
    }

    Match.wipeSeason(account._id, season).then(() => this.refreshMatchData())
  }

  componentDidMount() {
    this.refreshMatchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season) {
      this.refreshMatchData()
    }
    if (prevProps.account.battletag !== this.props.account.battletag) {
      this.setState(prevState => ({ battletag: this.props.account.battletag }))
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
    const defaultPath = FileUtil.defaultCsvExportFilename(account.battletag, season)
    const options = { defaultPath }

    if (isElectron()) {
      window.remote.dialog.showSaveDialog(options, path => {
        if (path && path.length > 0) {
          this.exportSeasonTo(path)
        }
      })
    }
  }

  toggleEditForm = event => {
    event.currentTarget.blur()
    this.setState(prevState => ({ showEditForm: !prevState.showEditForm }))
  }

  onAccountUpdate = newBattletag => {
    this.props.onAccountUpdate()
    this.setState(prevState => ({ battletag: newBattletag, showEditForm: false }))
  }

  render() {
    const { account, onDelete, season } = this.props
    const { _id } = account
    const { latestMatch, totalMatches, showEditForm, battletag,
            topHeroes } = this.state
    const haveLatestRank = latestMatch && typeof latestMatch.rank === 'number'
    const haveLatestResult = latestMatch && latestMatch.result

    return (
      <li className="Box mb-3 p-3 account-list-item">
        <div className="d-flex flex-justify-between flex-items-center">
          <div className="width-full mb-2 mt-1">
            <div className="d-flex flex-items-center flex-justify-between">
              {showEditForm ? (
                <>
                  <AccountForm
                    _id={_id}
                    battletag={battletag}
                    totalAccounts="1"
                    onUpdate={this.onAccountUpdate}
                  />
                  <button
                    className="btn-link f6"
                    type="button"
                    onClick={this.toggleEditForm}
                  >Cancel rename</button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn-link h1 text-bold text-left d-block flex-auto"
                  onClick={this.onAccountClick}
                >{battletag}</button>
              )}
              <AccountDeleteForm
                id={_id}
                onDelete={onDelete}
                battletag={battletag}
              />
            </div>
            <div className="text-gray f4 account-meta d-flex flex-items-center">
              {haveLatestResult && !haveLatestRank ? (
                <span>Last match: {latestMatch.result}</span>
              ) : null}
              {latestMatch && latestMatch.playedAt ? (
                <>
                  {haveLatestResult && !haveLatestRank ? (
                    <span className="separator" />
                  ) : null}
                  Last played {latestMatch.playedAt.toLocaleDateString()}
                </>
              ) : latestMatch && latestMatch.createdAt ? (
                <>
                  {haveLatestResult && !haveLatestRank ? (
                    <span className="separator" />
                  ) : null}
                  Last logged {latestMatch.createdAt.toLocaleDateString()}
                </>
              ) : null}
              {totalMatches > 0 ? (
                <>
                  <span className="separator" />
                  <span>{totalMatches} match{totalMatches === 1 ? null : 'es'}</span>
                </>
              ) : (
                <span>No matches in season {season}</span>
              )}
            </div>
            <button
              className="btn-link link-gray-dark f6 show-on-hover"
              type="button"
              onClick={this.toggleEditForm}
            >Rename account</button>
            {totalMatches > 0 ? (
              <>
                <button
                  type="button"
                  aria-label="Save season as a CSV file"
                  className="ml-3 btn-link tooltipped show-on-hover tooltipped-n link-gray-dark f6"
                  onClick={this.exportSeason}
                >Export season {season}</button>
                <button
                  type="button"
                  className="btn-link text-red show-on-hover f6 ml-3"
                  onClick={this.wipeSeason}
                >Delete matches</button>
              </>
            ) : null}
          </div>
          <div className="d-flex flex-items-center">
            {haveLatestRank ? (
              <button
                type="button"
                className="text-center btn-link btn-rank"
                onClick={this.onAccountClick}
              >
                <MatchRankImage
                  rank={latestMatch.rank}
                  className="d-inline-block"
                />
                <h3 className="h4 text-normal lh-condensed text-gray-dark my-0">{latestMatch.rank}</h3>
              </button>
            ) : null}
            <div className="ml-3 text-right">
              {topHeroes && topHeroes.length > 0 ? (
                <div className={`AvatarStack account-avatar-stack AvatarStack--right ${topHeroes.length >= 3 ? 'AvatarStack--three-plus' : 'AvatarStack--two'}`}>
                  <div className="AvatarStack-body tooltipped tooltipped-n" aria-label={topHeroes.join(', ')}>
                    {topHeroes.map(hero => (
                      <HeroImage
                        key={hero}
                        hero={hero}
                        className="avatar account-hero-avatar"
                        size="40"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default AccountListItem
