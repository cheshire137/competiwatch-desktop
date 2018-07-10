import React, { Component } from 'react'
import SeasonSelect from './SeasonSelect'
import AccountSelect from './AccountSelect'

class Header extends Component {
  changeActivePage = event => {
    const button = event.currentTarget
    button.blur()
    const active = button.name
    this.props.onPageChange(active)
  }

  listItemClass = page => {
    const { activePage } = this.props
    const pageIsFirstInNav = page === 'accounts'
    const activePageIsNotInNav = pageIsFirstInNav && activePage === 'manage-seasons'
    if (activePage === page || activePageIsNotInNav) {
      return 'breadcrumb-item breadcrumb-item-selected'
    }
    return 'breadcrumb-item'
  }

  renderAccountsButton = () => {
    const { activePage } = this.props
    if (activePage === 'accounts') {
      return null
    }

    return (
      <li className={this.listItemClass('accounts')}>
        <button
          name="accounts"
          type="button"
          className="btn-link"
          onClick={this.changeActivePage}
        >Accounts</button>
      </li>
    )
  }

  renderMatchesButton = () => {
    const { activeAccountID, activePage } = this.props
    if (!activeAccountID) {
      return null
    }

    if (activePage === 'log-match') {
      return (
        <li className={this.listItemClass('matches')}>
          <button
            name="matches"
            type="button"
            className="btn-link"
            onClick={this.changeActivePage}
          >Matches</button>
        </li>
      )
    }

    if (activePage === 'matches') {
      return (
        <li className={this.listItemClass('matches')}>
          Matches
        </li>
      )
    }
  }

  renderLogMatchButton = () => {
    if (this.props.activePage !== 'log-match') {
      return null
    }

    return (
      <li className={this.listItemClass('log-match')}>
        Log a match
      </li>
    )
  }

  render() {
    const { activeSeason, latestSeason, onSeasonChange,
            dbAccounts, activeAccountID, loadMatchesForAccount } = this.props

    return (
      <div className="mb-4">
        <div className="container mb-2 mt-4 d-flex flex-items-center">
          <SeasonSelect
            activeSeason={activeSeason}
            latestSeason={latestSeason}
            onChange={onSeasonChange}
            onPageChange={this.changeActivePage}
          />
          {activeAccountID ? (
            <AccountSelect
              db={dbAccounts}
              activeAccountID={activeAccountID}
              onChange={loadMatchesForAccount}
            />
          ) : null}
        </div>
        <nav aria-label="Breadcrumb">
          <div className="container">
            <ol>
              {this.renderAccountsButton()}
              {this.renderMatchesButton()}
              {this.renderLogMatchButton()}
            </ol>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
