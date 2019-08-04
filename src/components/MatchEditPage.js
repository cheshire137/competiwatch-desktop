import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'
import MatchForm from './MatchForm'
import Match from '../models/Match'

class MatchEditPage extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: [] }
  }

  refreshMatches = () => {
    const {accountID, season, id} = this.props

    Match.findAll(accountID, season).then(matches => {
      this.setState(prevState => {
        const match = matches.filter(m => m._id === id)[0]
        return { matches, match }
      }, () => {
        this.state.match.isLastPlacement().then(isLastPlacement => {
          this.setState(prevState => ({isLastPlacement}))
        })
      })
    })
  }

  componentDidMount() {
    this.refreshMatches()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadMatch()
    }
  }

  onMatchUpdate = () => {
    const { id, onPageChange } = this.props
    onPageChange('matches', true, id)
  }

  loadMatchesPage = () => {
    this.props.onPageChange('matches')
  }

  getPriorMatches = () => {
    const { id } = this.props
    const { matches } = this.state
    let index = 0
    for (const match of matches) {
      if (match._id === id) {
        break
      }
      index++
    }
    return matches.slice(0, index)
  }

  renderMatchForm = () => {
    const { match, isLastPlacement } = this.state
    if (!match || typeof isLastPlacement !== 'boolean') {
      return null
    }

    const { id, theme } = this.props
    return (
      <MatchForm
        id={id}
        priorMatches={this.getPriorMatches()}
        theme={theme}
        season={match.season}
        accountID={match.accountID}
        isPlacement={match.isPlacement}
        isLastPlacement={isLastPlacement}
        latestRank={match.rank}
        onUpdate={this.onMatchUpdate}
        rank={match.rank}
        comment={match.comment}
        map={match.map}
        group={match.group}
        groupSize={match.groupSize}
        heroes={match.heroes}
        playedAt={match.playedAt}
        dayOfWeek={match.dayOfWeek}
        timeOfDay={match.timeOfDay}
        allyThrower={match.allyThrower}
        allyLeaver={match.allyLeaver}
        enemyThrower={match.enemyThrower}
        enemyLeaver={match.enemyLeaver}
        playOfTheGame={match.playOfTheGame}
        result={match.result}
        role={match.role}
      />
    )
  }

  render() {
    const { id } = this.props

    return (
      <div className="container layout-children-container">
        {this.renderMatchForm()}
        <div className="border-top pt-2 mt-4">
          <MatchDeleteForm
            id={id}
            onDelete={this.loadMatchesPage}
          />
        </div>
      </div>
    )
  }
}

export default MatchEditPage
