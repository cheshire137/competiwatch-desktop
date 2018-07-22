import React, { Component } from 'react'
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
          <li
            key={season}
            className={this.listItemClass(i)}
          >
            Season {season}
            {season > firstNonDeletableSeason && i === 0 ? (
              <SeasonDeleteForm
                season={season}
                onDelete={onDelete}
              />
            ) : null}
          </li>
        ))}
      </ul>
    )
  }
}

export default SeasonsList
