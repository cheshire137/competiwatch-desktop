import React, { Component } from 'react'
import ImportForm from './ImportForm'
import LoadingPage from './LoadingPage'
import Account from '../models/Account'

class ImportPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: -1 }
  }

  refreshAccount = () => {
    const { accountID } = this.props

    Account.find(accountID).then(account => {
      this.setState(prevState => ({ account }))
    })
  }

  refreshMatchCount = () => {
    const { accountID, season } = this.props
    const account = new Account({ _id: accountID })

    account.totalMatches(season).then(totalMatches => {
      this.setState(prevState => ({ totalMatches }))
    })
  }

  componentDidMount() {
    this.refreshMatchCount()
    this.refreshAccount()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accountID !== this.props.accountID) {
      this.refreshAccount()
    }
    if (prevProps.accountID !== this.props.accountID ||
        prevProps.season !== this.props.season) {
      this.refreshMatchCount()
    }
  }

  render() {
    const { season, onImport } = this.props
    const { totalMatches, account } = this.state
    if (totalMatches < 0 || !account) {
      return <LoadingPage />
    }

    return (
      <div className="container layout-children-container">
        {totalMatches > 0 ? (
          <p>
            Importing matches will <strong>delete</strong> your
            <strong> {totalMatches} match{totalMatches === 1 ? null : 'es'} </strong>
            in season {season}.
          </p>
        ) : null}
        <ImportForm
          season={season}
          onImport={onImport}
          account={account}
        />
      </div>
    )
  }
}

export default ImportPage
