import React, { Component } from 'react'
import ImportForm from './ImportForm'

class ImportPage extends Component {
  render() {
    const { season, accountID } = this.props

    return (
      <div className="container layout-children-container">
        <ImportForm
          season={season}
          accountID={accountID}
        />
      </div>
    )
  }
}

export default ImportPage
