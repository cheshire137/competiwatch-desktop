import React, { Component } from 'react'

class MatchesAccountHeader extends Component {
  render() {
    const { account, season } = this.props

    if (!account) {
      return null
    }

    return (
      <h2>
        Season {season}
        <span> / </span>
        {account.battletag} Matches
      </h2>
    )
  }
}

export default MatchesAccountHeader
