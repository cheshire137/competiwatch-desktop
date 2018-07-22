import React, { Component } from 'react'
import SeasonDeleteForm from './SeasonDeleteForm'

class SeasonListItem extends Component {
  listItemClass = index => {
    let classes = ['d-flex flex-justify-between flex-items-center']
    if (index > 0) {
      classes = classes.concat(['border-top', 'pt-2', 'mt-2'])
    }
    return classes.join(' ')
  }

  render() {
    const { seasonNumber, index, firstNonDeletableSeason, onDelete } = this.props

    return (
      <li className={this.listItemClass(index)}>
        Season {seasonNumber}
        {seasonNumber > firstNonDeletableSeason && index === 0 ? (
          <SeasonDeleteForm
            season={seasonNumber}
            onDelete={onDelete}
          />
        ) : null}
      </li>
    )
  }
}

export default SeasonListItem
