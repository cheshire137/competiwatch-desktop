import React, { Component } from 'react'
import Match from '../models/Match'
import MapSelect from './MapSelect'
import HeroSelect from './HeroSelect'
import './MatchForm.css'

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

  onHeroChange = (hero, isSelected) => {
    this.setState(prevState => {
      const heroes = prevState.heroes.split(',').map(str => str.trim())
      const heroIndex = heroes.indexOf(hero)
      if (isSelected && heroIndex < 0) {
        heroes.push(hero)
      }
      if (!isSelected && heroIndex > -1) {
        delete heroes[heroIndex]
      }
      return { heroes: heroes.join(', ') }
    })
  }

  render() {
    const { rank, comment, map, group, heroes } = this.state
    const { season } = this.props

    return (
      <form
        onSubmit={this.onSubmit}
        className="clearfix"
      >
        <div className="col-md-12 col-lg-5 float-left pr-3-md">
          <div className="d-flex-md flex-items-center-md flex-justify-between-md">
            <dl className="form-group">
              <dt>
                <label
                  htmlFor="match-rank"
                  className="sr-field-label"
                >New SR:</label>
              </dt>
              <dd>
                <input
                  id="match-rank"
                  type="text"
                  className="form-control sr-field"
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
          </div>
          <dl className="form-group mt-0">
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
          <div className="Box p-3 mb-3">
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
          </div>
        </div>
        <div className="col-md-12 col-lg-6 float-left pl-4-md">
          <dl className="form-group my-0">
            <dt className="text-bold">Heroes played:</dt>
            <dd>
              <HeroSelect
                heroes={heroes}
                season={season}
                onToggle={this.onHeroChange}
              />
            </dd>
          </dl>
          <div className="form-actions">
            <button type="submit" className="btn">Save match</button>
          </div>
        </div>
      </form>
    )
  }
}

export default MatchForm
