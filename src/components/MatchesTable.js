import React, { Component } from 'react'
import MatchListItem from './MatchListItem'

class MatchesTable extends Component {
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
    const { matches, db } = this.props

    return (
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
    )
  }
}

export default MatchesTable
