import React, { Component } from 'react'
import SeasonSelect from './SeasonSelect'
import AccountSelect from './AccountSelect'
import MainNavigation from './MainNavigation/index'
import './Header.css'

class Header extends Component {
  render() {
    const { activeSeason, latestSeason, onSeasonChange, accounts, onPageChange,
            activeAccountID, onAccountChange, activePage, onExport } = this.props

    return (
      <div className="mb-3 sticky-bar border-bottom">
        <div className="d-flex flex-items-center container">
          {accounts && accounts.length > 0 ? (
            <SeasonSelect
              activeSeason={activeSeason}
              latestSeason={latestSeason}
              onChange={onSeasonChange}
              onPageChange={onPageChange}
            />
          ) : null}
          {activeAccountID ? (
            <AccountSelect
              accounts={accounts}
              activeAccountID={activeAccountID}
              onChange={onAccountChange}
              onPageChange={onPageChange}
            />
          ) : null}
          <MainNavigation
            onPageChange={onPageChange}
            activePage={activePage}
            activeSeason={activeSeason}
            activeAccountID={activeAccountID}
            onExport={onExport}
          />
        </div>
      </div>
    )
  }
}

export default Header
