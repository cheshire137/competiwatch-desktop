import React, { Component } from 'react'
import SeasonSelect from './SeasonSelect'

class Header extends Component {
  changeActivePage = event => {
    event.target.blur()
    const active = event.target.name
    this.props.onPageChange(active)
  }

  listItemClass = page => {
    if (this.props.activePage === page) {
      return 'breadcrumb-item breadcrumb-item-selected'
    }
    return 'breadcrumb-item'
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

    return (
      <li className={this.listItemClass('matches')}>
        Matches
      </li>
    )
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
    const { activeSeason, latestSeason, onSeasonChange, dbSeasons,
            onSeasonCreate } = this.props

    return (
      <div className="mb-4">
        <div className="container mb-2 mt-4">
          <SeasonSelect
            activeSeason={activeSeason}
            latestSeason={latestSeason}
            onChange={onSeasonChange}
            onSeasonCreate={onSeasonCreate}
            dbSeasons={dbSeasons}
          />
        </div>
        <nav aria-label="Breadcrumb">
          <div className="container">
            <ol>
              <li className={this.listItemClass('accounts')}>
                <button
                  name="accounts"
                  type="button"
                  className="btn-link"
                  onClick={this.changeActivePage}
                >Accounts</button>
              </li>
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
