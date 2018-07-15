import React, { Component } from 'react'
import Setting from '../models/Setting'

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    const { defaultAccountID } = props.settings
    this.state = { defaultAccountID }
  }

  componentDidUpdate(prevProps) {
    const prevSettings = prevProps.settings
    const currentSettings = this.props.settings

    if (prevSettings.defaultAccountID !== currentSettings.defaultAccountID) {
      this.setState(prevState => ({
        defaultAccountID: currentSettings.defaultAccountID
      }))
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { settings, onSave } = this.props
    const { defaultAccountID } = this.state

    settings.defaultAccountID = defaultAccountID
    settings.save().then(() => {
      onSave(settings)
    })
  }

  onDefaultAccountIDChange = event => {
    const defaultAccountID = event.target.value
    this.setState(prevState => ({ defaultAccountID }))
  }

  render() {
    const { accounts, settings } = this.props
    if (!settings) {
      return (
        <div className="blankslate">
          <h1>
            <span className="ion ion-md-refresh mr-3 ion-spin" />
            Loading...
          </h1>
        </div>
      )
    }

    const { defaultAccountID } = this.state

    return (
      <form
        onSubmit={this.onSubmit}
      >
        <dl className="form-group">
          <dt>
            <label
              htmlFor="default-account"
            >Default Battle.net account:</label>
          </dt>
          <dd>
            <select
              className="form-select"
              value={defaultAccountID}
              disabled={accounts.length < 1}
              onChange={this.onDefaultAccountIDChange}
            >
              <option value="">none</option>
              {accounts.map(account => (
                <option
                  key={account._id}
                  value={account._id}
                >{account.battletag}</option>
              ))}
            </select>
          </dd>
        </dl>
        <div className="mb-4">
          <button
            type="submit"
            className="btn btn-primary"
          >Save settings</button>
        </div>
      </form>
    )
  }
}

export default SettingsForm
