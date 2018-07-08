import React, { Component } from 'react'
import MatchesTable from './MatchesTable'
import Match from '../models/Match'

class MatchesList extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: [] }
  }

  refreshMatches = () => {
    const { db, onLoad, accountID } = this.props
    Match.findAll(db, accountID).then(matches => {
      this.setState(prevState => ({ matches }))
      onLoad(matches.length)
    })
  }

  componentDidMount() {
    this.refreshMatches()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalMatches != this.props.totalMatches) {
      this.refreshMatches()
    }
  }

  changeToMatchFormPage = event => {
    event.target.blur()
    const { matches } = this.state
    if (matches.length > 0) {
      const latestMatch = matches[matches.length - 1]
      console.log('latest match', latestMatch)
      this.props.onPageChange('log-match', latestMatch.rank)
    } else {
      this.props.onPageChange('log-match')
    }
  }

  render() {
    const { matches } = this.state
    const { totalMatches, db } = this.props
    const noMatches = matches.length < 1

    return (
      <div className="mb-4">
        <div className="d-flex flex-items-center flex-justify-between">
          <h2
            className="h2 text-normal mb-2 d-flex flex-items-center"
          >Matches <span className="Counter ml-2 h4 px-2">{totalMatches}</span></h2>
          {noMatches ? '' : (
            <button
              type="button"
              className="btn-link"
              onClick={this.changeToMatchFormPage}
            >Log a match</button>
          )}
        </div>
        {noMatches ? (
          <div className="blankslate">
            <h3 className="mb-2">No matches have been added</h3>
            <button
              type="button"
              className="btn-large btn btn-primary"
              onClick={this.changeToMatchFormPage}
            >Log a match</button>
          </div>
        ) : (
          <MatchesTable
            matches={matches}
            db={db}
          />
        )}
      </div>
    )
  }
}

export default MatchesList
