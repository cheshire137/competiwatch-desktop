import React, { Component } from 'react'
import MatchListItem from './MatchListItem'
import Match from '../models/Match'

class MatchesList extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: [] }
  }

  refreshMatches = () => {
    const { db, onLoad } = this.props
    Match.findAll(db).then(matches => {
      this.setState(prevState => ({ matches }))
      onLoad(matches.length)
    })
  }

  componentDidMount() {
    this.refreshMatches()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalMatches != this.props.totalMatches) {
      this.refreshMatches()
    }
  }

  render() {
    const { matches } = this.state
    const { totalMatches, db } = this.props

    return (
      <div className="mb-4">
        <h2
          className="h2 text-normal mb-2 d-flex flex-items-center"
        >Matches <span className="Counter ml-2 h4 px-2">{totalMatches}</span></h2>
        <ul className="list-style-none">
          {matches.map((match, i) => (
            <MatchListItem
              key={match._id}
              db={db}
              {...match}
              isLast={i === matches.length - 1}
              onDelete={this.refreshMatches}
            />
          ))}
          {matches.length < 1 ? (
            <li>
              No matches have been added
            </li>
          ) : ''}
        </ul>
      </div>
    )
  }
}

export default MatchesList
