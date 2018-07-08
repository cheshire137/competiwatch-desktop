import React, { Component } from 'react'

class SeasonsList extends Component {
  render() {
    const { latestSeason } = this.props
    const seasons = Array.from({ length: latestSeason }, (v, k) => k + 1).reverse()

    return (
      <div className="mb-4">
        <h2
          className="h2 text-normal mb-2 d-flex flex-items-center"
        >Competitive seasons <span className="Counter ml-2 h4 px-2">{latestSeason}</span></h2>
        <ul className="list-style-none">
          {seasons.map((season, i) => (
            <li
              key={season}
              className={i > 0 ? 'border-top pt-2 mt-2' : ''}
            >
              Season {season}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SeasonsList
