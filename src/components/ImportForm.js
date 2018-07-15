import React, { Component } from 'react'
import CsvImporter from '../models/CsvImporter'
import Match from '../models/Match'
import './ImportForm.css'

class ImportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: '',
      importLogEntries: [],
      isValid: false,
      isImporting: false
    }
  }

  onImportComplete = matches => {
    this.setState(prevState => ({ path: '', isImporting: false }))
    this.props.onImport(matches)
  }

  logMatchImport = match => {
    this.setState(prevState => {
      const logEntries = prevState.importLogEntries.slice(0)
      const messageParts = [
        'Imported:',
        typeof match.rank === 'number' ? match.rank : match.result,
        match.map ? `on ${match.map}` : null,
        match.heroList.length > 0 ? `as ${match.heroList.join(', ')}` : null,
        match.groupList.length > 0 ? `with ${match.groupList.join(', ')}` : null
      ]
      const message = messageParts.filter(part => part).join(' ')
      logEntries.unshift({ message, key: match._id })
      return { importLogEntries: logEntries }
    })
  }

  importFromPath = () => {
    const { path } = this.state
    const { season, accountID, db } = this.props
    const importer = new CsvImporter(path, season, accountID)

    console.log('wiped season', season, 'for account', accountID)
    importer.import(db, this.logMatchImport)
      .then(this.onImportComplete)
  }

  wipeSeasonAndImport = () => {
    const { season, accountID, db } = this.props

    this.setState(prevState => {
      const logEntries = prevState.importLogEntries.slice(0)
      const message = `Deleting existing matches in season ${season}...`

      logEntries.unshift({ message, key: 'wipe-notice' })

      return { isImporting: true, importLogEntries: logEntries }
    })

    Match.wipeSeason(db, accountID, season).then(this.importFromPath)
  }

  onFormSubmit = event => {
    event.preventDefault()

    const { isValid, isImporting } = this.state
    if (!isValid || isImporting) {
      return
    }

    this.wipeSeasonAndImport()
  }

  onFileChange = event => {
    const file = event.target.files[0]
    if (!file) {
      this.setState(prevState => ({ isValid: false }))
      return
    }

    this.setState(prevState => ({ path: file.path, isValid: true }))
  }

  render() {
    const { importLogEntries, isValid, isImporting } = this.state

    return (
      <form onSubmit={this.onFormSubmit}>
        <dl className="form-group mt-0">
          <dt><label htmlFor="csv">Choose a CSV file:</label></dt>
          <dd>
            <input
              type="file"
              id="csv"
              required
              disabled={isImporting}
              className="form-control"
              onChange={this.onFileChange}
            />
          </dd>
        </dl>
        {isImporting ? (
          <button
            type="button"
            disabled
            className="btn btn-primary"
          >Importing...</button>
        ) : (
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary"
          >Import matches</button>
        )}
        {importLogEntries.length > 0 ? (
          <div className="border-top mt-4 pt-4">
            <ul className="list-style-none import-log-list">
              {importLogEntries.map(log => (
                <li key={log.key}>
                  {log.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </form>
    )
  }
}

export default ImportForm
