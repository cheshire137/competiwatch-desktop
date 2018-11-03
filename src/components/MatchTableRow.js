import React, { Component } from 'react'
import ColorGradient from '../models/ColorGradient'
import MatchRankImage from './MatchRankImage'
import HeroImage from './HeroImage'
import TimeOfDayEmoji from './TimeOfDayEmoji'
import DayOfWeekEmoji from './DayOfWeekEmoji'
import './MatchTableRow.css'

const winColors = [[178,212,132], [102,189,125]]
const lossColors = [[250,170,124], [246,106,110]]
const neutralColor = [254,234,138]

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

const groupSizeDescription = groupSize => {
  if (groupSize === 1) {
    return 'solo queue'
  }
  if (groupSize === 2) {
    return 'duo queue'
  }
  return `${groupSize}-stack`
}

class MatchTableRow extends Component {
  outerClass = () => {
    const { isLast, match, firstRankedMatchID } = this.props
    let classes = []

    if (!isLast) {
      classes = classes.concat(['border-bottom', 'pb-2', 'mb-2'])
    }
    if (match.isPlacement) {
      classes.push('match-placement-row')

      if (typeof match.rank === 'number') {
        classes.push('match-last-placement-row')
      }
    } else if (firstRankedMatchID === match._id) {
      classes.push('match-placement-log-row')
    }

    return classes.join(' ')
  }

  throwerTooltip = () => {
    const match = this.props.match
    const { allyThrower, enemyThrower } = match
    const tooltip = []

    if (allyThrower) {
      tooltip.push('Thrower on my team')
    }
    if (enemyThrower) {
      tooltip.push('Thrower on the enemy team')
    }

    return tooltip.join(' + ')
  }

  leaverTooltip = () => {
    const match = this.props.match
    const { allyLeaver, enemyLeaver } = match
    const tooltip = []

    if (allyLeaver) {
      tooltip.push('Leaver on my team')
    }
    if (enemyLeaver) {
      tooltip.push('Leaver on the enemy team')
    }

    return tooltip.join(' + ')
  }

  mapBackgroundClass = () => {
    const map = this.props.match.map
    if (!map) {
      return ''
    }

    const slug = map.toLowerCase()
      .replace(/:/g, '')
      .replace(/[\s']/g, '-')
    return `background-${slug}`
  }

  matchNumber = () => {
    const { match, index, totalPlacementMatches, firstRankedMatchID } = this.props

    if (match.isPlacement) {
      return `P${index + 1}`
    }

    if (firstRankedMatchID === match._id && totalPlacementMatches === 1) {
      return 'P'
    }

    return (index - totalPlacementMatches) + 1
  }

  matchNumberClass = () => {
    const classes = ['match-cell', 'hide-sm', 'match-number-cell']

    if (this.props.match.isPlacement) {
      classes.push('match-placement-number-cell')
    }

    return classes.join(' ')
  }

  rankChangeStyle = () => {
    const { match, rankChanges } = this.props
    const style = {}

    if (match.isPlacement) {
      return style
    }

    let color = null
    if (match.result === 'draw') {
      color = neutralColor
    } else {
      const colorRange = match.result === 'win' ? winColors : lossColors
      const gradient = new ColorGradient(colorRange, rankChanges.length)
      const rgbColors = gradient.rgb()
      const index = rankChanges.indexOf(match.rankChange)

      if (typeof index === 'number') {
        color = rgbColors[index]
      }
    }

    if (color) {
      style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }

    return style
  }

  rankClass = () => {
    const { placementRank, match } = this.props
    const classes = ['match-cell', 'rank-cell']

    if (typeof placementRank === 'number') {
      if (placementRank > match.rank) {
        classes.push('worse-than-placement')
      } else {
        classes.push('better-than-placement')
      }
    }

    return classes.join(' ')
  }

  streakClass = () => {
    const { match } = this.props
    const classes = ['match-cell', 'position-relative', 'hide-sm']
    if (match.isDraw()) {
      classes.push('streak-empty')
    }
    return classes.join(' ')
  }

  streakStyle = () => {
    const { match, longestWinStreak, longestLossStreak } = this.props
    const style = {}
    let colors = []
    let stepCount = 0
    const streakList = []
    let streak = 0

    if (match.isWin()) {
      colors = winColors
      stepCount = longestWinStreak
      streak = match.winStreak
    } else if (match.isLoss()) {
      colors = lossColors
      stepCount = longestLossStreak
      streak = match.lossStreak
    }

    if (colors.length > 0) {
      for (let i = 1; i <= stepCount; i++) {
        streakList.push(i)
      }
      const gradient = new ColorGradient(colors, stepCount)
      const rgbColors = gradient.rgb()
      const index = streakList.indexOf(streak)
      const color = rgbColors[index]
      style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    }

    return style
  }

  editMatch = event => {
    const button = event.currentTarget
    const matchID = button.value

    button.blur()
    this.props.onEdit(matchID)
  }

  commentTooltip = () => {
    const { comment } = this.props.match
    if (!comment) {
      return
    }

    return comment.trim().replace(/"/g, "'")
  }

  commentClass = () => {
    const { comment } = this.props.match
    let classes = ['match-cell', 'hide-sm', 'comment-cell', 'css-truncate']

    if (comment && comment.trim().length > 0) {
      classes = classes.concat(['tooltipped', 'tooltipped-multiline', 'tooltipped-n'])
    }

    return classes.join(' ')
  }

  groupClass = () => {
    const { groupList } = this.props.match
    let classes = ['match-cell', 'hide-sm', 'css-truncate', 'group-cell']

    if (groupList.length > 0) {
      classes = classes.concat(['tooltipped', 'tooltipped-n', 'tooltipped-multiline'])
    }

    return classes.join(' ')
  }

  groupTooltip = () => {
    const { groupList } = this.props.match
    if (groupList.length < 1) {
      return
    }

    return groupList.join(', ')
  }

  render() {
    const { match, priorRank, showThrowerLeaver, showPlayOfTheGame, showJoinedVoice,
            showComment, showDayTime, showHeroes, showGroup } = this.props
    const { rank, _id, groupList, heroList, comment, playOfTheGame, result,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver, map,
            rankChange, dayOfWeek, timeOfDay, groupSize, joinedVoice } = match
    const timeAndDayPresent = dayOfWeek && timeOfDay && dayOfWeek.length > 0 && timeOfDay.length > 0
    const isWin = match.isWin()
    const isLoss = match.isLoss()

    return (
      <tr className={this.outerClass()}>
        <td
          className={this.matchNumberClass()}
        >{this.matchNumber()}</td>
        <td
          className={`match-cell hide-sm result-cell result-${result}`}
        >
          {result ? result.charAt(0).toUpperCase() : (
            <span>&mdash;</span>
          )}
        </td>
        <td
          style={this.rankChangeStyle()}
          className="position-relative match-cell sr-change-cell"
        >
          {typeof rankChange === 'number' ? (
            <span className={`darken-change darken-change-${result}`} />
          ) : null}
          {typeof rankChange === 'number' ? (
            <span className="position-relative">{rankChange}</span>
          ) : (
            <span>&mdash;</span>
          )}
        </td>
        <td className={this.rankClass()}>
          <div className="d-flex flex-items-center flex-justify-center">
            <MatchRankImage
              rank={rank}
              priorRank={priorRank}
              className="d-inline-block mr-1 hide-sm"
            />
            {typeof rank === 'number' ? rank : (
              <span>&mdash;</span>
            )}
          </div>
        </td>
        <td
          className={this.streakClass()}
          style={this.streakStyle()}
        >
          {isWin || isLoss ? (
            <span className={`darken-change darken-change-${result}`} />
          ) : null}
          {isWin ? (
            <span className="position-relative">{match.winStreak}</span>
          ) : isLoss ? (
            <span className="position-relative">{match.lossStreak}</span>
          ) : null}
        </td>
        <td
          className={`match-cell no-wrap ${this.mapBackgroundClass()}`}
        >{map}</td>
        {showComment ? (
          <td
            className={this.commentClass()}
            aria-label={this.commentTooltip()}
          >
            <span className="css-truncate-target comment-truncate-target">{comment}</span>
          </td>
        ) : null}
        {showDayTime ? (
          <td
            className="match-cell text-center hide-sm time-cell no-wrap"
          >
            {timeAndDayPresent ? (
              <div
                className="tooltipped tooltipped-n"
                aria-label={`${capitalize(dayOfWeek)} ${capitalize(timeOfDay)}`}
              >
                <DayOfWeekEmoji dayOfWeek={dayOfWeek} />
                <span> </span>
                <TimeOfDayEmoji timeOfDay={timeOfDay} />
              </div>
            ) : null}
          </td>
        ) : null}
        {showHeroes ? (
          <td
            className="match-cell hide-sm heroes-cell"
          >
            {heroList.map(hero => (
              <span
                key={hero}
                className="tooltipped tooltipped-n d-inline-block hero-portrait-container"
                aria-label={hero}
              >
                <HeroImage
                  hero={hero}
                  className="rounded-1 d-inline-block"
                />
              </span>
            ))}
          </td>
        ) : null}
        {showGroup ? (
          <td
            className={this.groupClass()}
            aria-label={this.groupTooltip()}
          >
            {groupList.length > 0 ? (
              <span className="css-truncate-target group-truncate-target">{groupList.join(', ')} </span>
            ) : null}
            {groupList.length + 1 !== groupSize ? (
              <span className="Counter">{groupSizeDescription(groupSize)}</span>
            ) : null}
          </td>
        ) : null}
        {showThrowerLeaver ? (
          <td
            className="match-cell no-wrap hide-sm throwers-leavers-cell"
          >
            {allyThrower || enemyThrower ? (
              <span
                className="Counter tooltipped tooltipped-n text-white bg-red"
                aria-label={this.throwerTooltip()}
              >T</span>
            ) : null}
            {allyLeaver || enemyLeaver ? (
              <span
                className="Counter tooltipped tooltipped-n text-white bg-red"
                aria-label={this.leaverTooltip()}
              >L</span>
            ) : null}
          </td>
        ) : null}
        {showPlayOfTheGame || showJoinedVoice ? (
          <td
            className="match-cell hide-sm potg-cell"
          >
            {playOfTheGame ? (
              <span
                className={`tooltipped tooltipped-n ${showJoinedVoice ? 'd-inline-block mr-2' : ''}`}
                aria-label="Play of the game"
              ><span role="img" aria-label="Party">🎉</span></span>
            ) : null}
            {joinedVoice ? (
              <span
                className="tooltipped tooltipped-n"
                aria-label="Joined voice chat"
              ><span role="img" aria-label="Speaker">🔊</span></span>
            ) : null}
          </td>
        ) : null}
        <td className="match-cell options-cell">
          <button
            type="button"
            onClick={this.editMatch}
            className="btn-link link-gray-dark tooltipped tooltipped-w"
            aria-label="Edit this match"
            value={_id}
          >
            <span className="ion ion-md-create" />
          </button>
        </td>
      </tr>
    )
  }
}

export default MatchTableRow
