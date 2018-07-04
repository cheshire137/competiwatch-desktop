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
    const { rank, _id, db, map, group, heroes, comment, onDelete } = this.props

    return (
      <li className={this.outerClass()}>
        {rank}
        <MatchDeleteForm
          _id={_id}
          db={db}
          onDelete={onDelete}
        />
      </li>
    )
  }
}

export default MatchListItem
