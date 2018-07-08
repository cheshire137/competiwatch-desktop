import React, { Component } from 'react'
import Season from '../models/Season'

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
    season.save(this.props.db).then(() => {
      this.props.onCreate(season.number)
    })
  }

  onSeasonChange = event => {
    const seasonStr = event.target.value
    if (seasonStr.length < 1) {
      this.setState(prevState => ({ isValid: false }))
      return
    }

    const season = parseInt(seasonStr, 10)
    const isValid = season > this.props.latestSeason
    this.setState(prevState => ({ season, isValid }))
  }

  render() {
    const { season, isValid } = this.state
    const { latestSeason } = this.props

    return (
      <form
        className="Box p-3"
        onSubmit={this.saveSeason}
      >
        <h2
          className="h2 text-normal mb-2"
        >Add a season</h2>
        <dl className="form-group mt-0">
          <dt>
            <label
              htmlFor="season-number"
            >Season:</label>
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
