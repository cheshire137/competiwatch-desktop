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
    const { totalMatches, account } = this.state
    if (totalMatches < 0 || !account) {
      return <LoadingPage />
    }

    const { season, onImport } = this.props
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

        <h4 className="h4 mt-4 mb-2">Requirements:</h4>
        <ul className="ml-4 mb-4-sm">
          <li><span className="text-bold">Valid columns:</span> rank, heroes, map, comment, time, day, date, ally thrower, ally leaver, enemy thrower, enemy leaver, group, group size, result, placement, play of the game</li>
          <li>Rank is required for non-placement matches</li>
          <li>Valid values for 'day' column: weekday, weekend</li>
          <li>Valid values for 'time' column: morning, afternoon, evening, night</li>
          <li>Valid values for thrower, leaver, play of the game, and placement columns: Y, N</li>
          <li>Valid values for result column: win, loss, draw</li>
          <li>'Group' should be a comma-separated list of the people who grouped with you</li>
          <li>'Group Size' should be an integer between 1-6 indicating how many people, including yourself, were in your group</li>
          <li>
            <ul className="list-style-none">
              <li>'Date' represents when you played the match</li>
              <li>Should be a date that can optionally include the time</li>
              <li>Should be in the format YYYY-MM-DD or ISO 8601</li>
              <li>Sample values: <code>2017-02-27</code> and <code>2018-07-29T21:36:43.977Z</code></li>
            </ul>
          </li>
          <li>Column order does not matter</li>
          <li>
            <ul className="list-style-none">
              <li>A header row is required</li>
              <li>Should be a comma-separated list of valid columns</li>
              <li>Columns can be capitalized or not (case doesn't matter)</li>
            </ul>
          </li>
          <li>Hero names must be comma-separated; case doesn't matter</li>
        </ul>
      </div>
    )
  }
}

export default ImportPage
