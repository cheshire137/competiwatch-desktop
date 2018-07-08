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

    return (
      <div className="mb-4">
        <div className="d-flex flex-items-center flex-justify-between">
          <h2
            className="h2 text-normal mb-2 d-flex flex-items-center"
          >Matches <span className="Counter ml-2 h4 px-2">{totalMatches}</span></h2>
          <button
            type="button"
            className="btn-link"
            onClick={this.changeToMatchFormPage}
          >Log a match</button>
        </div>
        <MatchesTable
          matches={matches}
          db={db}
        />
        {matches.length < 1 ? (
          <div className="mt-2">No matches have been added</div>
        ) : ''}
      </div>
    )
  }
}

export default MatchesList
