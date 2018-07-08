import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'
import ColorGradient from '../models/ColorGradient'
import MatchRankImage from './MatchRankImage'
import HeroImage from './HeroImage'
import './MatchListItem.css'

const winColors = [[178,212,132], [102,189,125]]
const lossColors = [[250,170,124], [246,106,110]]
const neutralColor = [254,234,138]

class MatchListItem extends Component {
  outerClass = () => {
    const { isLast, match } = this.props
    let classes = []

    if (!isLast) {
      classes = classes.concat(['border-bottom', 'pb-2', 'mb-2'])
    }
    if (match.isPlacement) {
      classes.push('match-placement-row')

      if (typeof match.rank === 'number') {
        classes.push('match-last-placement-row')
      }
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

    const slug = map.toLowerCase().replace(/:/, '').replace(/\s/, '-')
    return `background-${slug}`
  }

  matchNumber = () => {
    const { match, index, totalPlacementMatches } = this.props

    if (match.isPlacement) {
      return `P${index + 1}`
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

  render() {
    const { db, onDelete, index, match, priorRank } = this.props
    const { rank, _id, group, heroList, comment, playOfTheGame, result,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver, map,
            rankChange, isPlacement } = match

    return (
      <tr className={this.outerClass()}>
        <td
          className={this.matchNumberClass()}
        >{this.matchNumber()}</td>
        <td
          className={`match-cell hide-sm result-cell result-${result}`}
        >{result ? result.charAt(0).toUpperCase() : '--'}</td>
        <td
          style={this.rankChangeStyle()}
          className="position-relative match-cell sr-change-cell"
        >{rankChange ? rankChange : '--'}</td>
        <td className={this.rankClass()}>
          <div className="d-flex flex-items-center flex-justify-center">
            <MatchRankImage
              rank={rank}
              isPlacement={isPlacement}
              priorRank={priorRank}
              className="d-inline-block mr-1 hide-sm"
            />
            {rank || '--'}
          </div>
        </td>
        <td
          className="match-cell position-relative hide-sm"
        ></td>
        <td
          className={`match-cell no-wrap ${this.mapBackgroundClass()}`}
        >{map}</td>
        <td
          className="match-cell hide-sm comment-cell"
        >{comment}</td>
        <td
          className="match-cell text-center hide-sm time-cell no-wrap"
        >{match.prettyPlayedAt()}</td>
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
        <td
          className="match-cell hide-sm friends-cell"
        >{group}</td>
        <td
          className="match-cell hide-sm throwers-leavers-cell"
        >
          {allyThrower || enemyThrower ? (
            <span
              className="Counter tooltipped tooltipped-n text-white bg-red"
              aria-label={this.throwerTooltip()}
            >T</span>
          ) : ''}
          {allyLeaver || enemyLeaver ? (
            <span
              className="Counter tooltipped tooltipped-n text-white bg-red"
              aria-label={this.leaverTooltip()}
            >L</span>
          ) : ''}
        </td>
        <td
          className="match-cell hide-sm potg-cell"
        >
          {playOfTheGame ? (
            <span
              className="tooltipped tooltipped-n"
              aria-label="Play of the game"
            >
              <span className="text-green ion ion-ios-checkmark-circle"></span>
            </span>
          ) : ''}
        </td>
        <td className="match-cell options-cell">
          <MatchDeleteForm
            _id={_id}
            db={db}
            onDelete={onDelete}
          />
        </td>
      </tr>
    )
  }
}

export default MatchListItem
