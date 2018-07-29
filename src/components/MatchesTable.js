import React, { Component } from 'react'
import MatchTableRow from './MatchTableRow'

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

  firstMatchWithRank = () => {
    return this.props.matches.filter(match => typeof match.rank === 'number')[0]
  }

  placementRank = firstMatchWithRank => {
    const { matches } = this.props
    const placementMatches = matches
      .filter(match => match.isPlacement && typeof match.rank === 'number')
    const lastPlacement = placementMatches[placementMatches.length - 1]

    if (lastPlacement) {
      return lastPlacement.rank
    }

    if (firstMatchWithRank) {
      return firstMatchWithRank.rank
    }
  }

  priorRank = index => {
    const priorMatch = this.props.matches[index - 1]
    if (priorMatch) {
      return priorMatch.rank
    }
  }

  showThrowerLeaverColumn = () => {
    const matches = this.props.matches
      .filter(match => match.allyThrower || match.allyLeaver ||
                       match.enemyThrower || match.enemyLeaver)
    return matches.length > 0
  }

  showPlayOfTheGameColumn = () => {
    return this.props.matches.filter(match => match.playOfTheGame).length > 0
  }

  showCommentColumn = () => {
    return this.props.matches
      .filter(match => match.comment && match.comment.trim().length > 0).length > 0
  }

  showDayTimeColumn = () => {
    return this.props.matches.filter(match => match.dayOfWeek && match.timeOfDay).length > 0
  }

  showHeroesColumn = () => {
    return this.props.matches.filter(match => match.heroList.length > 0).length > 0
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

  componentDidMount() {
    const { scrollToLatestMatch } = this.props

    if (scrollToLatestMatch) {
      const scrollToComponent = require('react-scroll-to-component')
      scrollToComponent(this.lastMatchRow)
    }
  }

  render() {
    const { matches, onEdit } = this.props
    const rankChanges = this.matchRankChangesByResult()
    const firstMatchWithRank = this.firstMatchWithRank()
    let totalPlacementMatches = matches.filter(match => match.isPlacement).length
    if (totalPlacementMatches < 1 && firstMatchWithRank) {
      totalPlacementMatches = 1
    }
    const showThrowerLeaver = this.showThrowerLeaverColumn()
    const showPlayOfTheGame = this.showPlayOfTheGameColumn()
    const showComment = this.showCommentColumn()
    const showDayTime = this.showDayTimeColumn()
    const showHeroes = this.showHeroesColumn()
    const longestWinStreak = this.getLongestWinStreak()
    const longestLossStreak = this.getLongestLossStreak()
    const placementRank = this.placementRank(firstMatchWithRank)

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
            {showComment ? (
              <th
                className="match-header hide-sm"
              >Comment</th>
            ) : null}
            {showDayTime ? (
              <th
                className="match-header hide-sm"
              >Day/Time</th>
            ) : null}
            {showHeroes ? (
              <th
                className="match-header hide-sm"
              >Heroes</th>
            ) : null}
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
            {showPlayOfTheGame ? (
              <th
                className="match-header hide-sm tooltipped tooltipped-n"
                aria-label="Play of the game"
              >
                <span role="img" aria-label="Party">🎉</span>
              </th>
            ) : null}
            <th
              className="match-header"
            ></th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, i) => {
            const isLast = i === matches.length - 1
            const firstRankedMatchID = firstMatchWithRank ? firstMatchWithRank._id : null
            const priorRank = this.priorRank(i)
            const matchRankChanges = rankChanges[match.result] || []

            return (
              <MatchTableRow
                key={match._id}
                match={match}
                index={i}
                ref={row => {
                  if (isLast) {
                    this.lastMatchRow = row
                  }
                }}
                placementRank={placementRank}
                firstRankedMatchID={firstRankedMatchID}
                rankChanges={matchRankChanges}
                isLast={isLast}
                onEdit={onEdit}
                priorRank={priorRank}
                totalPlacementMatches={totalPlacementMatches}
                showThrowerLeaver={showThrowerLeaver}
                showPlayOfTheGame={showPlayOfTheGame}
                showDayTime={showDayTime}
                showComment={showComment}
                showHeroes={showHeroes}
                longestWinStreak={longestWinStreak}
                longestLossStreak={longestLossStreak}
              />
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default MatchesTable
