import React, { Component } from 'react'
import Season from '../models/Season'

class SeasonForm extends Component {
  constructor(props) {
    super(props)
    this.state = { season: props.latestSeason + 1, isValid: true }
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
      <details className="details-reset details-overlay details-overlay-dark" open>
        <summary className="btn" aria-haspopup="dialog">Open dialog</summary>
        <div className="details-dialog Box Box--overlay d-flex flex-column anim-fade-in fast">
          <div className="Box-header">
            <button
              className="Box-btn-octicon btn-octicon float-right"
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
            ><span className="ion ion-ios-close-circle" /></button>
            <h3 className="Box-title">Add a season</h3>
          </div>
          <form
            onSubmit={this.saveSeason}
          >
            <div className="overflow-auto">
              <div className="Box-body overflow-auto">
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
              </div>
            </div>
            <div className="Box-footer">
              <button
                type="submit"
                className="btn btn-block"
                autoFocus
                disabled={!isValid}
              >Save</button>
            </div>
          </form>
        </div>
      </details>
    )
  }
}

export default SeasonForm
