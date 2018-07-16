import React, { Component } from 'react'
import Setting from '../models/Setting'

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    const { defaultAccountID, theme } = props.settings
    this.state = { defaultAccountID, theme }
  }

  componentDidUpdate(prevProps) {
    const prevSettings = prevProps.settings
    const currentSettings = this.props.settings

    if (prevSettings.defaultAccountID !== currentSettings.defaultAccountID) {
      this.setState(prevState => ({ defaultAccountID: currentSettings.defaultAccountID }))
    }

    if (prevSettings.theme !== currentSettings.theme) {
      this.setState(prevState => ({ theme: currentSettings.theme }))
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { settings, onSave } = this.props
    const { defaultAccountID, theme } = this.state

    settings.defaultAccountID = defaultAccountID
    settings.theme = theme
    settings.save().then(() => {
      onSave(settings)
    })
  }

  onDefaultAccountIDChange = event => {
    const defaultAccountID = event.target.value
    this.setState(prevState => ({ defaultAccountID }))
  }

  onThemeChange = event => {
    const theme = event.target.value
    this.setState(prevState => ({ theme }))
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

    const { defaultAccountID, theme } = this.state

    return (
      <form
        onSubmit={this.onSubmit}
      >
        <dl className="form-group">
          <dt>
            <label
              htmlFor="default-account"
              className="label-lg"
            >Default Battle.net account:</label>
          </dt>
          <dd>
            <select
              id="default-account"
              className="form-select select-lg"
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
        <dl className="form-group">
          <dt>
            <label
              htmlFor="theme"
              className="label-lg"
            >App theme:</label>
          </dt>
          <dd>
            <select
              id="theme"
              className="form-select select-lg"
              value={theme}
              onChange={this.onThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </dd>
        </dl>
        <div className="mb-4">
          <button
            type="submit"
            className="btn btn-primary btn-large"
          >Save settings</button>
        </div>
      </form>
    )
  }
}

export default SettingsForm
