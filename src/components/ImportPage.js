import React, { Component } from 'react'
import ImportForm from './ImportForm'

class ImportPage extends Component {
  render() {
    const { season, accountID, db, onImport } = this.props

    return (
      <div className="container layout-children-container">
        <ImportForm
          season={season}
          accountID={accountID}
          db={db}
          onImport={onImport}
        />
      </div>
    )
  }
}

export default ImportPage
