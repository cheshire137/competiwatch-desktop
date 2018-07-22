import React, { Component } from 'react'
import SeasonListItem from './SeasonListItem'
import SeasonDeleteForm from './SeasonDeleteForm'

class SeasonsList extends Component {
  listItemClass = index => {
    let classes = ['d-flex flex-justify-between flex-items-center']
    if (index > 0) {
      classes = classes.concat(['border-top', 'pt-2', 'mt-2'])
    }
    return classes.join(' ')
  }

  render() {
    const { latestSeason, firstNonDeletableSeason, onDelete } = this.props
    const seasons = Array.from({ length: latestSeason }, (v, k) => k + 1).reverse()

    return (
      <ul className="list-style-none mb-4">
        {seasons.map((season, i) => (
          <SeasonListItem
            key={season}
            firstNonDeletableSeason={firstNonDeletableSeason}
            onDelete={onDelete}
            seasonNumber={season}
            index={i}
          />
        ))}
      </ul>
    )
  }
}

export default SeasonsList
