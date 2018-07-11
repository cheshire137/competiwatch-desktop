import React, { Component } from 'react'
import CsvImporter from '../models/CsvImporter'
import Match from '../models/Match'

class ImportForm extends Component {
  constructor(props) {
    super(props)
    this.state = { path: '' }
  }

  onImportComplete = matches => {
    this.setState(prevState => ({ path: '' }))
    this.props.onImport(matches)
  }

  importFromPath = () => {
    const { path } = this.state
    const { season, accountID, db } = this.props
    const importer = new CsvImporter(path, season, accountID)

    console.log('wiped season', season, 'for account', accountID)
    importer.import(db).then(this.onImportComplete)
  }

  wipeSeasonAndImport = () => {
    const { season, accountID, db } = this.props
    Match.wipeSeason(db, accountID, season).then(this.importFromPath)
  }

  onFormSubmit = event => {
    event.preventDefault()

    const { path } = this.state
    if (path.length < 1) {
      return
    }

    this.wipeSeasonAndImport()
  }

  onFileChange = event => {
    const file = event.target.files[0]
    if (!file) {
      return
    }
    this.setState(prevState => ({ path: file.path }))
  }

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
      >
        <dl className="form-group mt-0">
          <dt><label htmlFor="csv">Choose a CSV file:</label></dt>
          <dd>
            <input
              type="file"
              id="csv"
              required
              className="form-control"
              onChange={this.onFileChange}
            />
          </dd>
        </dl>
        <button type="submit" className="btn btn-primary">
          Import matches
        </button>
      </form>
    )
  }
}

export default ImportForm
