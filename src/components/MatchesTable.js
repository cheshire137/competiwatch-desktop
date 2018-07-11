import React, { Component } from 'react'
import MatchListItem from './MatchListItem'

class MatchesTable extends Component {
  matchRankChangesByResult = () => {
    const results = ['win', 'loss']
    const rankChanges = { draw: [] }

    for (const result of results) {
      rankChanges[result] = []

      const matchesWithResult = this.props.matches.filter(match => match.result === result)
      const rankChangesForResult = matchesWithResult
        .map(match => match.rankChange)
        .filter(rankChange => typeof rankChange === 'number').sort()

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

  showshowThrowerLeaverColumn = () => {
    const matches = this.props.matches
      .filter(match => match.allyThrower || match.allyLeaver ||
                       match.enemyThrower || match.enemyLeaver)
    return matches.length > 0
  }

  getLongestWinStreak = () => {
    const winStreaks = this.props.matches.filter(match => typeof match.winStreak === 'number')
      .map(match => match.winStreak)
    if (winStreaks.length < 1) {
      return 0
    }
    return Math.max(...winStreaks)
  }

  getLongestLossStreak = () => {
    const lossStreaks = this.props.matches.filter(match => typeof match.lossStreak === 'number')
      .map(match => match.lossStreak)
    if (lossStreaks.length < 1) {
      return 0
    }
    return Math.max(...lossStreaks)
  }

  render() {
    const { matches, db, onDelete } = this.props
    const rankChanges = this.matchRankChangesByResult()
    const totalPlacementMatches = matches.filter(match => match.isPlacement).length
    const showThrowerLeaver = this.showshowThrowerLeaverColumn()
    const longestWinStreak = this.getLongestWinStreak()
    const longestLossStreak = this.getLongestLossStreak()

    return (
      <table className="width-full">
        <thead>
          <tr>
            <th
              className="match-header hide-sm"
            >#</th>
            <th
              className="match-header hide-sm"
            >Win/Loss</th>
            <th
              className="match-header no-wrap"
            >+/- SR</th>
            <th
              className="match-header"
            >Rank</th>
            <th
              className="match-header hide-sm no-wrap"
            >Streak</th>
            <th
              className="match-header"
            >Map</th>
            <th
              className="match-header hide-sm"
            >Comment</th>
            <th
              className="match-header hide-sm"
            >Day/Time</th>
            <th
              className="match-header hide-sm"
            >Heroes</th>
            <th
              className="match-header hide-sm"
            >Group</th>
            {showThrowerLeaver ? (
              <th
                className="match-header hide-sm tooltipped tooltipped-n"
                aria-label="Throwers and leavers"
              >
                <span role="img" aria-label="Sad face">😢</span>
              </th>
            ) : null}
            <th
              className="match-header hide-sm tooltipped tooltipped-n"
              aria-label="Play of the game"
            >
              <span role="img" aria-label="Party">🎉</span>
            </th>
            <th
              className="match-header"
            ><span className="ion-ios-cog ion"></span></th>
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
              showThrowerLeaver={showThrowerLeaver}
              longestWinStreak={longestWinStreak}
              longestLossStreak={longestLossStreak}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

export default MatchesTable
