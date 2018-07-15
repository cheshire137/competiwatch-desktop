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

    if (['log-match', 'edit-match', 'import'].indexOf(activePage) > -1) {
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
    const { isPlacement, activePage } = this.props

    if (activePage !== 'log-match') {
      return null
    }

    const text = isPlacement ? 'Log a placement match' : 'Log a match'
    return (
      <li
        className={this.listItemClass('log-match')}
      >{text}</li>
    )
  }

  renderEditMatchButton = () => {
    const { activePage } = this.props

    if (activePage !== 'edit-match') {
      return null
    }

    return (
      <li
        className={this.listItemClass('edit-match')}
      >Edit match</li>
    )
  }

  renderImportButton = () => {
    const { activePage } = this.props

    if (activePage !== 'import') {
      return null
    }

    return (
      <li
        className={this.listItemClass('import')}
      >Import</li>
    )
  }

  rightSideMessage = () => {
    const { activePage } = this.props

    if (activePage === 'log-match') {
      return (
        <div
          className="text-gray float-right"
        >* All fields optional except match result</div>
      )
    }
  }

  render() {
    const { activeSeason, latestSeason, onSeasonChange,
            dbAccounts, activeAccountID, onAccountChange } = this.props

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
              db={dbAccounts}
              activeAccountID={activeAccountID}
              onChange={onAccountChange}
              onPageChange={this.changeActivePage}
            />
          ) : null}
        </div>
        <div className="container clearfix">
          {this.rightSideMessage()}
          <nav aria-label="Breadcrumb">
            <ol>
              {this.renderAccountsButton()}
              {this.renderMatchesButton()}
              {this.renderLogMatchButton()}
              {this.renderEditMatchButton()}
              {this.renderImportButton()}
            </ol>
          </nav>
        </div>
      </div>
    )
  }
}

export default Header
