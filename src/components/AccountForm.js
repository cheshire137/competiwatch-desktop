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
        onSubmit={this.onSubmit}
      >
        <div>
          <label
            htmlFor="account-battletag"
          >Battletag</label>
          <input
            id="account-battletag"
            type="text"
            value={battletag}
            onChange={this.onBattletagChange}
            autoFocus
          />
        </div>
        <button type="submit">Add account</button>
      </form>
    )
  }
}

export default AccountForm
