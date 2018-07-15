import React, { Component } from 'react'
import ImportForm from './ImportForm'
import Account from '../models/Account'

class ImportPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: -1 }
  }

  refreshMatchCount = () => {
    const { accountID, season, db } = this.props
    const account = new Account({ _id: accountID })

    account.totalMatches(db, season).then(totalMatches => {
      this.setState(prevState => ({ totalMatches }))
    })
  }

  componentDidMount() {
    this.refreshMatchCount()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accountID !== this.props.accountID ||
        prevProps.season !== this.props.season) {
      this.refreshMatchCount()
    }
  }

  render() {
    const { season, accountID, db, onImport } = this.props
    const { totalMatches } = this.state

    return (
      <div className="container layout-children-container">
        {totalMatches > 0 ? (
          <p>
            Importing matches will <strong>delete</strong> your
            <strong> {totalMatches} match{totalMatches === 1 ? null : 'es'} </strong>
            in season {season}.
          </p>
        ) : null}
        {totalMatches < 0 ? (
          <p>Loading...</p>
        ) : (
          <ImportForm
            season={season}
            accountID={accountID}
            db={db}
            onImport={onImport}
          />
        )}
      </div>
    )
  }
}

export default ImportPage
