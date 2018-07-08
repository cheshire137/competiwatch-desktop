import React, { Component } from 'react'

class MatchesAccountHeader extends Component {
  render() {
    const { account, activePage, isPlacement } = this.props

    if (!account) {
      return null
    }

    return (
      <h2 className="h2 text-normal mb-2">
        {account.battletag}
        {activePage === 'log-match' ? (
          <span> / {isPlacement ? 'Log a placement match' : 'Log a match'}</span>
        ) : ''}
      </h2>
    )
  }
}

export default MatchesAccountHeader
