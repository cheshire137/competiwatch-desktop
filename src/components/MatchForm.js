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
        <dl className="form-group">
          <dt>
            <label
              htmlFor="match-map"
            >Map:</label>
          </dt>
          <dd>
            <select className="form-select">
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
        <div className="form-actions">
          <button type="submit" className="btn">Save match</button>
        </div>
      </form>
    )
  }
}

export default MatchForm
