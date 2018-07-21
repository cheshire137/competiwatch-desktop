import React, { Component } from 'react'
import SeasonSelect from './SeasonSelect'
import AccountSelect from './AccountSelect'
import MainNavigation from './MainNavigation'

class Header extends Component {
  changeActivePage = event => {
    const button = event.currentTarget
    const active = button.name

    button.blur()
    this.props.onPageChange(active)
  }

  render() {
    const { activeSeason, latestSeason, onSeasonChange, accounts,
            activeAccountID, onAccountChange, activePage } = this.props

    return (
      <div className="mb-3">
        <div className="container mb-2 mt-4 d-flex flex-items-center">
          <SeasonSelect
            activeSeason={activeSeason}
            latestSeason={latestSeason}
            onChange={onSeasonChange}
            onPageChange={this.changeActivePage}
          />
          {activeAccountID ? (
            <AccountSelect
              accounts={accounts}
              activeAccountID={activeAccountID}
              onChange={onAccountChange}
              onPageChange={this.changeActivePage}
            />
          ) : null}
        </div>
        <div className="container clearfix">
          <MainNavigation
            onPageChange={this.changeActivePage}
            activePage={activePage}
            activeAccountID={activeAccountID}
          />
        </div>
      </div>
    )
  }
}

export default Header
