import React, { Component } from 'react'
import MatchForm from './MatchForm'
import Match from '../models/Match'

class MatchesPage extends Component {
  constructor(props) {
    super(props)
    this.state = { totalMatches: 0 }
  }

  onMatchCreation = () => {
    this.setState(prevState => ({ totalMatches: prevState.totalMatches + 1 }))
  }

  onMatchesLoad = totalMatches => {
    this.setState(prevState => ({ totalMatches }))
  }
  render() {
    const { dbMatches } = this.props
    const { totalMatches } = this.state

    return (
      <div className="container layout-children-container">
        <MatchForm
          db={dbMatches}
          onCreate={this.onMatchCreation}
        />
      </div>
    )
  }
}

export default MatchesPage
