import React, { Component } from 'react'
import SettingsForm from './SettingsForm'
import DatabaseFileLink from './DatabaseFileLink'

const dbNames = ['accounts', 'matches', 'seasons', 'settings']
const dbLabels = {
  'accounts': 'Accounts',
  'matches': 'Matches',
  'seasons': 'Seasons',
  'settings': 'Settings'
}

class SettingsPage extends Component {
  returnToAccounts = event => {
    event.target.blur()
    this.props.onPageChange('accounts')
  }

  render() {
    const { accounts, settings, onSave } = this.props

    return (
      <div className="container layout-children-container">
        <div className="mt-4">
          <button
            type="button"
            onClick={this.returnToAccounts}
            className="btn-link"
          >&larr; Back to your accounts</button>
        </div>
        <h1
          className="h1 mb-2 mt-4"
        >Settings</h1>
        <div className="col-md-6 mb-4">
          <SettingsForm
            accounts={accounts}
            settings={settings}
            onSave={onSave}
          />
        </div>
        <hr />
        <div className="col-md-6 mb-4">
          <h2 className="h2 mb-2">Data files</h2>
          <p>
            Competiwatch stores your match history, accounts, settings,
            and other data in JSON files. You can back up these files if you like.
          </p>
          <ul className="list-style-none">
            {dbNames.map(dbName => (
              <li className="mb-2" key={dbName}>
                <DatabaseFileLink
                  label={`${dbLabels[dbName]}:`}
                  dbName={dbName}
                />
              </li>
            ))}
          </ul>
          <p>
            <strong className="text-red">Warning:</strong> deleting, editing, or moving these
            files can result in losing your competitive match history.
          </p>
        </div>
      </div>
    )
  }
}

export default SettingsPage
