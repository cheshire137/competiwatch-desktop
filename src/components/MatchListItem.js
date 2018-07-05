import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'

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
        <td></td>
        <td></td>
        <td></td>
        <td>{rank}</td>
        <td></td>
        <td>{map}</td>
        <td>{comment}</td>
        <td>{date}</td>
        <td>{heroes}</td>
        <td>{group}</td>
        <td></td>
        <td>
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
