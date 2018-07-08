import React, { Component } from 'react'
import Season from '../models/Season'

class SeasonForm extends Component {
  constructor(props) {
    super(props)
    this.state = { season: props.latestSeason + 1, isValid: true }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latestSeason !== this.props.latestSeason) {
      this.setState(prevState => ({ season: this.props.latestSeason + 1 }))
    }
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
    const season = parseInt(event.target.value, 10)
    const isValid = season > this.props.latestSeason
    this.setState(prevState => ({ season, isValid }))
  }

  render() {
    const { season, isValid } = this.state
    const { onClose, latestSeason } = this.props

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
