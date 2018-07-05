import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'
import './MatchListItem.css'

class MatchListItem extends Component {
  outerClass = () => {
    if (this.props.isLast) {
      return ''
    }
    return 'border-bottom pb-2 mb-2'
  }

  throwerTooltip = () => {
    const { allyThrower, enemyThrower } = this.props
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
    const { allyLeaver, enemyLeaver } = this.props
    const tooltip = []
    if (allyLeaver) {
      tooltip.push('Leaver on my team')
    }
    if (enemyLeaver) {
      tooltip.push('Leaver on the enemy team')
    }
    return tooltip.join(' + ')
  }

  render() {
    const { rank, _id, db, map, group, heroes, comment, playedAt,
            onDelete, index, allyThrower, allyLeaver,
            enemyThrower, enemyLeaver, playOfTheGame } = this.props

    return (
      <tr className={this.outerClass()}>
        <td
          className="match-cell hide-sm match-number-cell"
        >{index + 1}</td>
        <td
          className="match-cell hide-sm result-cell"
        ></td>
        <td
          className="position-relative match-cell sr-change-cell"
        ></td>
        <td
          className="match-cell rank-cell"
        >{rank}</td>
        <td
          className="match-cell position-relative hide-sm"
        ></td>
        <td
          className="match-cell no-wrap"
        >{map}</td>
        <td
          className="match-cell hide-sm comment-cell"
        >{comment}</td>
        <td
          className="match-cell text-center hide-sm time-cell no-wrap"
        >{playedAt}</td>
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
