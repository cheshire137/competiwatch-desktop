import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'
import './MatchListItem.css'

class MatchListItem extends Component {
  outerClass = () => {
    const { isLast, match } = this.props
    let classes = []

    if (!isLast) {
      classes = classes.concat(['border-bottom', 'pb-2', 'mb-2'])
    }
    if (match.isPlacement()) {
      classes.push('match-placement-row')
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
    const { match, index } = this.props

    if (match.isPlacement()) {
      return `P${index + 1}`
    }

    return index + 1
  }

  matchNumberClass = () => {
    const classes = ['match-cell', 'hide-sm', 'match-number-cell']

    if (this.props.match.isPlacement()) {
      classes.push('match-placement-number-cell')
    }

    return classes.join(' ')
  }

  render() {
    const { db, onDelete, index, result, match } = this.props
    const { rank, _id, group, heroes, comment, playOfTheGame,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver, map } = match

    return (
      <tr className={this.outerClass()}>
        <td
          className={this.matchNumberClass()}
        >{this.matchNumber()}</td>
        <td
          className="match-cell hide-sm result-cell"
        >{result}</td>
        <td
          className="position-relative match-cell sr-change-cell"
        ></td>
        <td
          className="match-cell rank-cell"
        >{rank || '--'}</td>
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
        >{heroes}</td>
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
