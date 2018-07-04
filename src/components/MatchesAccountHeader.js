import React, { Component } from 'react'

class MatchesAccountHeader extends Component {
  render() {
    const { account, season, totalMatches } = this.props

    if (!account) {
      return null
    }

    return (
      <h2 className="h2 text-normal mb-2 d-flex flex-items-center">
        <span className="text-gray">Season {season}</span>
        <span> / </span>
        {account.battletag} Matches
        <span className="Counter ml-2 h4 px-2">{totalMatches}</span>
      </h2>
    )
  }
}

export default MatchesAccountHeader
