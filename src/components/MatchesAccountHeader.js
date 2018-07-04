import React, { Component } from 'react'

class MatchesAccountHeader extends Component {
  render() {
    const { account } = this.props

    if (!account) {
      return null
    }

    return (
      <h2>
        {account.battletag} Matches
      </h2>
    )
  }
}

export default MatchesAccountHeader
