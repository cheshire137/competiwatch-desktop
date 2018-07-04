import React, { Component } from 'react'
import Match from '../models/Match'

class MatchForm extends Component {
  constructor(props) {
    super(props)
    this.state = { rank: 0 }
  }

  onSubmit = event => {
    event.preventDefault()
    const data = { rank: this.state.rank }
    const match = new Match(data)
    match.save(this.props.db).then(() => {
      this.props.onCreate()
    })
  }

  onRankChange = event => {
    const rank = event.target.value
    this.setState(prevState => ({ rank }))
  }

  render() {
    const { rank } = this.state

    return (
      <form
        className="col-4"
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
        <div className="form-actions">
          <button type="submit" className="btn">Save match</button>
        </div>
      </form>
    )
  }
}

export default MatchForm
