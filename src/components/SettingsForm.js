import React, { Component } from 'react'
import Setting from '../models/Setting'

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = { defaultAccountID: '' }
  }

  refreshSettings = () => {
    const { dbSettings } = this.props

    Setting.load(dbSettings).then(setting => {
      this.setState(prevState => ({
        setting,
        defaultAccountID: setting.defaultAccountID
      }))
    })
  }

  componentDidMount() {
    this.refreshSettings()
  }

  onSubmit = event => {
    event.preventDefault()
    const { dbSettings } = this.props
    const { setting, defaultAccountID } = this.state
    if (!setting) {
      return
    }

    setting.defaultAccountID = defaultAccountID
    setting.save(dbSettings).then(newSetting => {
      this.setState(prevState => ({ setting: newSetting }))
    })
  }

  onDefaultAccountIDChange = event => {
    const defaultAccountID = event.target.value
    this.setState(prevState => ({ defaultAccountID }))
  }

  render() {
    const { setting } = this.state
    if (!setting) {
      return (
        <div className="blankslate">
          <h1>
            <span className="ion ion-md-refresh mr-3 ion-spin" />
            Loading...
          </h1>
        </div>
      )
    }

    const { accounts } = this.props
    const { defaultAccountID } = setting

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
