import React, { Component } from 'react'
import Season from '../models/Season'
import PackageInfo from '../../package.json'

const { remote, shell } = window.require('electron')
const { app } = remote

class SeasonForm extends Component {
  constructor(props) {
    super(props)
    this.state = { season: '', isValid: false }
  }

  saveSeason = event => {
    event.preventDefault()
    if (!this.state.isValid) {
      return
    }

    const season = new Season({ number: this.state.season })
    season.save().then(() => {
      this.setState(prevState => ({ season: '' }))
      this.props.onCreate(season.number)
    })
  }

  onSeasonChange = event => {
    const seasonStr = event.target.value
    if (seasonStr.length < 1) {
      this.setState(prevState => ({ season: seasonStr, isValid: false }))
      return
    }

    const season = parseInt(seasonStr, 10)
    const isValid = season > this.props.latestSeason
    this.setState(prevState => ({ season, isValid }))
  }

  openReleasesPage = event => {
    event.target.blur()

    const repoUrl = PackageInfo.repository.url
    const joiner = repoUrl.substr(-1) === '/' ? '' : '/'
    const releasesUrl = `${repoUrl}${joiner}releases`

    shell.openExternal(releasesUrl)
  }

  render() {
    const { season, isValid } = this.state
    const { latestSeason } = this.props
    const appName = app.getName()

    return (
      <form
        className="Box p-3"
        onSubmit={this.saveSeason}
      >
        <h2
          className="h2 text-normal mb-2"
        >Add a season</h2>
        <p>
          <span>A </span>
          <button
            type="button"
            className="btn-link"
            onClick={this.openReleasesPage}
          >new version</button>
          <span> of </span>
          {appName} may have the latest competitive
          season. If you can't update for some reason, you can add
          a season to continue logging matches.
        </p>
        <dl className="form-group mt-0">
          <dt>
            <label
              htmlFor="season-number"
            >Season number:</label>
          </dt>
          <dd>
            <input
              id="season-number"
              type="number"
              className="form-control"
              value={season}
              onChange={this.onSeasonChange}
              min={latestSeason + 1}
              step="1"
              required
            />
          </dd>
        </dl>
        <div className="form-actions">
          <button
            type="submit"
            className="btn"
            disabled={!isValid}
          >Add season</button>
        </div>
      </form>
    )
  }
}

export default SeasonForm
