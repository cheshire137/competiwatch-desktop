import React, { Component } from 'react'
import MatchesTable from './MatchesTable'
import Match from '../models/Match'
import './MatchesList.css'

class MatchesList extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: [] }
  }

  refreshMatches = () => {
    const { db, onLoad, accountID, season } = this.props
    Match.findAll(db, accountID, season).then(matches => {
      this.setState(prevState => ({ matches }))
      onLoad(matches.length)
    })
  }

  componentDidMount() {
    this.refreshMatches()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalMatches !== this.props.totalMatches ||
        prevProps.season !== this.props.season ||
        prevProps.accountID !== this.props.accountID) {
      this.refreshMatches()
    }
  }

  changeToMatchFormPage = event => {
    event.target.blur()
    const { matches } = this.state
    if (matches.length > 0) {
      const latestMatch = matches[matches.length - 1]
      this.props.onPageChange('log-match', latestMatch.rank)
    } else {
      this.props.onPageChange('log-match')
    }
  }

  changeToImportPage = event => {
    event.target.blur()
    this.props.onPageChange('import')
  }

  changeToEditPage = matchID => {
    this.props.onPageChange('edit-match', matchID)
  }

  render() {
    const { matches } = this.state
    const { totalMatches, season } = this.props
    const anyMatches = matches.length > 0

    return (
      <div className="mb-4">
        <div className="d-flex flex-items-center flex-justify-between">
          <h2
            className="h2 text-normal mb-2 d-flex flex-items-center"
          >Matches <span className="Counter ml-2 h4 px-2">{totalMatches}</span></h2>
          {anyMatches ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={this.changeToMatchFormPage}
            >Log a match</button>
          ) : ''}
        </div>
        {anyMatches ? (
          <div>
            <MatchesTable
              matches={matches}
              onEdit={this.changeToEditPage}
            />
            <div className="mt-4 text-small">
              <span>Replace your season {season} matches by </span>
              <button
                type="button"
                className="btn-link"
                onClick={this.changeToImportPage}
              >importing them</button>
              <span> from a CSV file.</span>
            </div>
          </div>
        ) : (
          <div className="blankslate">
            <h3 className="mb-2">No matches have been logged in season {season}</h3>
            <div className="d-flex flex-items-center flex-justify-between mx-auto populate-season-choices">
              <button
                type="button"
                className="btn-large btn btn-primary"
                onClick={this.changeToMatchFormPage}
              >Log a match</button>
              or
              <button
                type="button"
                className="btn btn-sm"
                onClick={this.changeToImportPage}
              >Import matches</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MatchesList
