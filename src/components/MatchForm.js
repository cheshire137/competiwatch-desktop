import React, { Component } from 'react'
import Match from '../models/Match'
import MapSelect from './MapSelect'
import HeroSelect from './HeroSelect'

const latestSeason = 11

class MatchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { rank: 0, comment: '', map: '', group: '', heroes: '' }
  }

  onSubmit = event => {
    event.preventDefault()
    const { rank, comment, map, group } = this.state
    const { accountID } = this.props
    const data = { rank, comment, map, accountID }
    const match = new Match(data)
    match.save(this.props.db).then(() => {
      this.props.onCreate()
    })
  }

  onCommentChange = event => {
    this.setState(prevState => ({ comment: event.target.value }))
  }

  onMapChange = map => {
    this.setState(prevState => ({ map }))
  }

  onRankChange = event => {
    this.setState(prevState => ({ rank: event.target.value }))
  }

  onGroupChange = event => {
    this.setState(prevState => ({ group: event.target.value }))
  }

  render() {
    const { rank, comment, map, group, heroes } = this.state

    return (
      <form
        onSubmit={this.onSubmit}
      >
        <dl className="form-group">
          <dt>
            <label
              htmlFor="match-rank"
            >New SR:</label>
          </dt>
          <dd>
            <input
              id="match-rank"
              type="text"
              className="form-control"
              value={rank}
              onChange={this.onRankChange}
              placeholder="2500"
              autoFocus
            />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>
            <label
              htmlFor="match-map"
            >Map:</label>
          </dt>
          <dd>
            <MapSelect map={map} onChange={this.onMapChange} />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>
            <label
              htmlFor="match-group"
            >Group members:</label>
          </dt>
          <dd>
            <input
              id="match-group"
              type="text"
              className="form-control"
              value={group}
              onChange={this.onGroupChange}
              placeholder="Separate names with commas"
            />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>Heroes played:</dt>
          <dd>
            <HeroSelect
              heroes={heroes}
              season={latestSeason}
            />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>
            <label
              htmlFor="match-comment"
            >Comment:</label>
          </dt>
          <dd>
            <input
              id="match-comment"
              type="text"
              className="form-control"
              value={comment}
              onChange={this.onCommentChange}
              placeholder="Notes about this game"
            />
          </dd>
        </dl>
        <div className="form-actions">
          <button type="submit" className="btn">Save match</button>
        </div>
      </form>
    )
  }
}

export default MatchForm
