import React, { Component } from 'react'
import MatchListItem from './MatchListItem'
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

  matchResult = (match, prevMatch) => {
    if (prevMatch) {
      if (match.rank > prevMatch.rank) {
        return 'W'
      }
      if (match.rank === prevMatch.rank) {
        return 'D'
      }
      return 'L'
    }
    return '--'
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
        <table className="width-full">
          <thead>
            <tr>
              <th className="match-header hide-sm">#</th>
              <th className="match-header hide-sm">Win/Loss</th>
              <th className="match-header no-wrap">+/- SR</th>
              <th className="match-header">Rank</th>
              <th className="match-header hide-sm no-wrap">Streak</th>
              <th className="match-header">Map</th>
              <th className="match-header hide-sm">Comment</th>
              <th className="match-header hide-sm">Day/Time</th>
              <th className="match-header hide-sm">Heroes</th>
              <th className="match-header hide-sm">Group</th>
              <th className="match-header hide-sm tooltipped tooltipped-n" aria-label="Throwers and leavers">😢</th>
              <th className="match-header hide-sm tooltipped tooltipped-n" aria-label="Play of the game">🎉</th>
              <th className="match-header"><span className="ion-ios-cog ion"></span></th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, i) => (
              <MatchListItem
                key={match._id}
                db={db}
                rank={match.rank}
                _id={match._id}
                map={match.map}
                group={match.group}
                heroes={match.heroes}
                comment={match.comment}
                index={i}
                playedAt={match.playedAt}
                allyThrower={match.allyThrower}
                enemyThrower={match.enemyThrower}
                allyLeaver={match.allyLeaver}
                enemyLeaver={match.enemyLeaver}
                playOfTheGame={match.playOfTheGame}
                result={match.result || this.matchResult(match, matches[i - 1])}
                isLast={i === matches.length - 1}
                onDelete={this.refreshMatches}
              />
            ))}
          </tbody>
        </table>
        {matches.length < 1 ? (
          <p>No matches have been added</p>
        ) : ''}
      </div>
    )
  }
}

export default MatchesList
