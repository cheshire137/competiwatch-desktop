import React, { Component } from 'react'
import Match from '../models/Match'

class MatchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { rank: 0, comment: '', map: '' }
  }

  onSubmit = event => {
    event.preventDefault()
    const { rank, comment, map } = this.state
    const data = { rank, comment, map }
    const match = new Match(data)
    match.save(this.props.db).then(() => {
      this.props.onCreate()
    })
  }

  onCommentChange = event => {
    this.setState(prevState => ({ comment: event.target.value }))
  }

  onMapChange = event => {
    this.setState(prevState => ({ map: event.target.value }))
  }

  onRankChange = event => {
    this.setState(prevState => ({ rank: event.target.value }))
  }

  render() {
    const { rank, comment, map } = this.state

    return (
      <form
        className="col-6"
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
            <select
              className="form-select"
              value={map}
              onChange={this.onMapChange}
            >
              <option value=""></option>
              <optgroup label="Assault">
                <option value="Hanamura">Hanamura</option>
                <option value="Horizon Lunar Colony">Horizon Lunar Colony</option>
                <option value="Temple of Anubis">Temple of Anubis</option>
                <option value="Volskaya Industries">Volskaya Industries</option>
              </optgroup>
              <optgroup label="Escort">
                <option value="Dorado">Dorado</option>
                <option value="Junkertown">Junkertown</option>
                <option value="Rialto">Rialto</option>
                <option value="Route 66">Route 66</option>
                <option value="Watchpoint: Gibraltar">Watchpoint: Gibraltar</option>
              </optgroup>
              <optgroup label="Hybrid">
                <option value="Blizzard World">Blizzard World</option>
                <option value="Eichenwalde">Eichenwalde</option>
                <option value="Hollywood">Hollywood</option>
                <option value="King's Row">King's Row</option>
                <option value="Numbani">Numbani</option>
              </optgroup>
              <optgroup label="Control">
                <option value="Ilios">Ilios</option>
                <option value="Lijiang Tower">Lijiang Tower</option>
                <option value="Nepal">Nepal</option>
                <option value="Oasis">Oasis</option>
              </optgroup>
            </select>
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
