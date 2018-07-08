import React, { Component } from 'react'
import MatchListItem from './MatchListItem'

class MatchesTable extends Component {
  matchRankChangesByResult = () => {
    const results = ['win', 'loss']
    const rankChanges = { draw: [] }

    for (const result of results) {
      rankChanges[result] = []

      const matchesWithResult = this.props.matches.filter(match => match.result === result)
      const rankChangesForResult = matchesWithResult.map(match => match.rankChange).
        filter(rankChange => typeof rankChange === 'number').sort()

      for (const rankChange of rankChangesForResult) {
        if (rankChanges[result].indexOf(rankChange) < 0) {
          rankChanges[result].push(rankChange)
        }
      }
    }

    return rankChanges
  }

  placementRank = () => {
    const { matches } = this.props
    const placementMatches = matches.filter(match => match.isPlacement &&
                                                     typeof match.rank === 'number')
    const lastPlacement = placementMatches[placementMatches.length - 1]
    if (lastPlacement) {
      return lastPlacement.rank
    }
  }

  priorRank = index => {
    const priorMatch = this.props.matches[index - 1]
    if (priorMatch) {
      return priorMatch.rank
    }
  }

  render() {
    const { matches, db, onDelete } = this.props
    const rankChanges = this.matchRankChangesByResult()
    const totalPlacementMatches = matches.filter(match => match.isPlacement).length

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
            <th className="match-header hide-sm">Time Played</th>
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
              match={match}
              index={i}
              placementRank={this.placementRank()}
              rankChanges={rankChanges[match.result] || []}
              isLast={i === matches.length - 1}
              onDelete={onDelete}
              priorRank={this.priorRank(i)}
              totalPlacementMatches={totalPlacementMatches}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

export default MatchesTable
