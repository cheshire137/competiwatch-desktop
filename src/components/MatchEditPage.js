import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'
import MatchForm from './MatchForm'
import Match from '../models/Match'

class MatchEditPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  loadMatch = () => {
    const { id, db } = this.props
    Match.find(db, id).then(match => {
      this.setState(prevState => ({ match }))

      match.isLastPlacement(db).then(isLastPlacement => {
        this.setState(prevState => ({ isLastPlacement }))
      })
    })
  }

  componentDidMount() {
    this.loadMatch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadMatch()
    }
  }

  loadMatchesPage = () => {
    this.props.onPageChange('matches')
  }

  renderMatchForm = () => {
    const { match, isLastPlacement } = this.state
    if (!match || typeof isLastPlacement !== 'boolean') {
      return null
    }

    const { db } = this.props
    return (
      <MatchForm
        season={match.season}
        accountID={match.accountID}
        db={db}
        isPlacement={match.isPlacement}
        isLastPlacement={isLastPlacement}
        latestRank={match.rank}
        onUpdate={this.loadMatchesPage}
      />
    )
  }

  render() {
    const { id, db } = this.props

    return (
      <div className="container layout-children-container">
        {this.renderMatchForm()}
        <div className="border-top pt-2 mt-4">
          <MatchDeleteForm
            _id={id}
            db={db}
            onDelete={this.loadMatchesPage}
          />
        </div>
      </div>
    )
  }
}

export default MatchEditPage
