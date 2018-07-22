import React, { Component } from 'react'
import SeasonDeleteForm from './SeasonDeleteForm'
import Season from '../models/Season'

class SeasonListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: -1 }
  }

  listItemClass = index => {
    let classes = []
    if (index > 0) {
      classes = classes.concat(['border-top', 'pt-2', 'mt-2'])
    }
    return classes.join(' ')
  }

  updateTotalMatchCount = () => {
    const season = new Season({ number: this.props.seasonNumber })
    season.totalMatches().then(totalMatches => {
      this.setState(prevState => ({ totalMatches }))
    })
  }

  componentDidMount() {
    this.updateTotalMatchCount()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seasonNumber !== this.props.seasonNumber) {
      this.updateTotalMatchCount()
    }
  }

  render() {
    const { seasonNumber, index, firstNonDeletableSeason, onDelete } = this.props
    const { totalMatches } = this.state

    return (
      <li className={this.listItemClass(index)}>
        <div className="d-flex mb-1 flex-justify-between flex-items-center">
          <span className="text-bold">Season {seasonNumber}</span>
          {seasonNumber > firstNonDeletableSeason && index === 0 ? (
            <SeasonDeleteForm
              season={seasonNumber}
              onDelete={onDelete}
            />
          ) : null}
        </div>
        {totalMatches > 0 ? (
          <div className="text-gray text-small">
            {totalMatches} match{totalMatches === 1 ? null : 'es'}
          </div>
        ) : null}
      </li>
    )
  }
}

export default SeasonListItem
