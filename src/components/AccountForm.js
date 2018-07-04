import React, { Component } from 'react'
import Account from '../models/Account'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = { battletag: '' }
  }

  onSubmit = event => {
    event.preventDefault()
    const data = { battletag: this.state.battletag }
    const account = new Account(data)
    account.save(this.props.db).then(() => {
      this.props.onCreate()
    })
  }

  onBattletagChange = event => {
    const battletag = event.target.value
    this.setState(prevState => ({ battletag }))
  }

  render() {
    const { battletag } = this.state

    return (
      <form
        className="col-4"
        onSubmit={this.onSubmit}
      >
        <dl className="form-group">
          <dt>
            <label
              htmlFor="account-battletag"
            >Battletag</label>
          </dt>
          <dd>
            <input
              id="account-battletag"
              type="text"
              className="form-control"
              value={battletag}
              onChange={this.onBattletagChange}
              placeholder="ASampleAccount#1234"
              autoFocus
            />
          </dd>
        </dl>
        <div className="form-actions">
          <button type="submit" className="btn">Add account</button>
        </div>
      </form>
    )
  }
}

export default AccountForm
