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

  render() {
    const { rank, _id, db, map, group, heroes, comment, date, onDelete } = this.props

    return (
      <tr className={this.outerClass()}>
        <td className="match-cell hide-sm match-number-cell"></td>
        <td className="match-cell hide-sm result-cell"></td>
        <td className="position-relative match-cell sr-change-cell"></td>
        <td className="match-cell rank-cell">{rank}</td>
        <td className="match-cell position-relative hide-sm"></td>
        <td className="match-cell no-wrap">{map}</td>
        <td className="match-cell hide-sm comment-cell">{comment}</td>
        <td className="match-cell text-center hide-sm time-cell no-wrap">{date}</td>
        <td className="match-cell hide-sm heroes-cell">{heroes}</td>
        <td className="match-cell hide-sm friends-cell">{group}</td>
        <td className="match-cell hide-sm throwers-leavers-cell"></td>
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
