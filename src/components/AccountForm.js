import React, { Component } from 'react'
import Account from '../models/Account'
import './AccountForm.css'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = { battletag: '', isValid: false }
  }

  onSubmit = event => {
    event.preventDefault()
    const { isValid, battletag } = this.state
    if (!isValid) {
      return
    }

    const data = { battletag }
    const account = new Account(data)

    account.save(this.props.db).then(() => {
      this.setState(prevState => ({ battletag: '', isValid: false }))
      this.props.onCreate()
    })
  }

  onBattletagChange = event => {
    const battletag = event.target.value
    const isValid = battletag && battletag.trim().length > 0

    this.setState(prevState => ({ battletag, isValid }))
  }

  render() {
    const { totalAccounts } = this.props
    const { battletag, isValid } = this.state

    return (
      <form
        className="border-top mt-4 pt-3 mb-4"
        onSubmit={this.onSubmit}
      >
        <h2
          className="h2 text-normal mt-0 mb-2"
        >Add an account</h2>
        <p>Add an account to log the competitive matches you've played on that account.</p>
        <div className="d-flex flex-items-center mt-0">
          <label
            htmlFor="account-battletag"
            className="mr-2"
          >Battletag:</label>
          <div className="input-group battletag-input-group">
            <input
              id="account-battletag"
              type="text"
              className="form-control"
              value={battletag}
              required
              onChange={this.onBattletagChange}
              placeholder="ASampleAccount#1234"
              autoFocus={totalAccounts < 1}
            />
            <span className="input-group-button">
              <button
                type="submit"
                className="btn"
                disabled={!isValid}
              >Add account</button>
            </span>
          </div>
        </div>
      </form>
    )
  }
}

export default AccountForm
