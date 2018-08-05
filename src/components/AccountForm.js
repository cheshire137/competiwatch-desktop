import React, { Component } from 'react'
import Account from '../models/Account'
import './AccountForm.css'

const isValidBattletag = battletag => {
  return battletag && battletag.trim().length > 0
}

class AccountForm extends Component {
  constructor(props) {
    super(props)
    const battletag = props.battletag || ''
    this.state = { battletag, isValid: isValidBattletag(battletag), error: null }
  }

  onSaveError = error => {
    let errorMessage = 'Something went wrong.'
    if (error.errorType === 'uniqueViolated') {
      errorMessage = 'That Battletag has already been taken.'
    }

    this.setState(prevState => ({ error: errorMessage }))
  }

  onSaveSuccess = () => {
    const { onCreate, onUpdate, _id } = this.props
    const { battletag } = this.state

    this.setState(prevState => ({ battletag: '', isValid: false, error: null }))

    if (_id) {
      onUpdate(battletag)
    } else {
      onCreate()
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { isValid, battletag } = this.state
    if (!isValid) {
      return
    }

    const { _id } = this.props
    const data = { battletag }
    if (_id) {
      data._id = _id
    }
    const account = new Account(data)

    account.save().then(this.onSaveSuccess, this.onSaveError)
  }

  onBattletagChange = event => {
    const battletag = event.target.value
    const isValid = isValidBattletag(battletag)

    this.setState(prevState => ({ battletag, isValid, error: null }))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.battletag !== this.props.battletag) {
      this.setState(prevState => ({
        battletag: this.props.battletag,
        isValid: isValidBattletag(this.props.battletag)
      }))
    }
  }

  render() {
    const { totalAccounts, _id } = this.props
    const { battletag, isValid, error } = this.state
    const buttonText = _id ? 'Save' : 'Add account'
    const battletagDomID = _id ? `account-${_id}-battletag` : 'account-battletag'

    return (
      <form
        className="mb-2"
        onSubmit={this.onSubmit}
      >
        <dl className={`form-group position-relative mt-0 ${error ? 'errored' : null}`}>
          <dd className="d-flex flex-items-center">
            <label
              htmlFor={battletagDomID}
              className="mr-2"
            >Battletag:</label>
            <div className="input-group battletag-input-group">
              <input
                id={battletagDomID}
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
                >{buttonText}</button>
              </span>
            </div>
          </dd>
          {error ? (
            <dd className="error battletag-error">{error}</dd>
          ) : null}
        </dl>
      </form>
    )
  }
}

export default AccountForm
