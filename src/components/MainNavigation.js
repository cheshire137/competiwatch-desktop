import React, { Component } from 'react'

class MainNavigation extends Component {
  underlineNavItemClass = page => {
    const { activePage } = this.props
    const pageIsFirstInNav = page === 'accounts'
    const activePageIsNotInNav = pageIsFirstInNav && activePage === 'manage-seasons'
    const classes = ['btn-link', 'UnderlineNav-item']

    if (activePage === page || activePageIsNotInNav) {
      classes.push('selected')
    }

    return classes.join(' ')
  }

  renderAccountsButton = () => {
    const { activePage } = this.props
    if (activePage === 'accounts') {
      return null
    }

    return (
      <button
        name="accounts"
        type="button"
        className={this.underlineNavItemClass('accounts')}
        onClick={this.props.onPageChange}
      >Accounts</button>
    )
  }

  renderMatchesButton = () => {
    const { activeAccountID, activePage } = this.props
    if (!activeAccountID) {
      return null
    }

    if (['log-match', 'edit-match', 'import'].indexOf(activePage) > -1) {
      return (
        <button
          name="matches"
          type="button"
          className={this.underlineNavItemClass('matches')}
          onClick={this.props.onPageChange}
        >Matches</button>
      )
    }

    if (activePage === 'matches') {
      return (
        <span className={this.underlineNavItemClass('matches')}>
          Matches
        </span>
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
      <span
        className={this.underlineNavItemClass('log-match')}
      >{text}</span>
    )
  }

  renderEditMatchButton = () => {
    const { activePage } = this.props

    if (activePage !== 'edit-match') {
      return null
    }

    return (
      <span
        className={this.underlineNavItemClass('edit-match')}
      >Edit match</span>
    )
  }

  renderImportButton = () => {
    const { activePage } = this.props

    if (activePage !== 'import') {
      return null
    }

    return (
      <span
        className={this.underlineNavItemClass('import')}
      >Import</span>
    )
  }

  render() {
    return (
      <nav className="UnderlineNav">
        <div className="UnderlineNav-body">
          {this.renderAccountsButton()}
          {this.renderMatchesButton()}
          {this.renderLogMatchButton()}
          {this.renderEditMatchButton()}
          {this.renderImportButton()}
        </div>
      </nav>
    )
  }
}

export default MainNavigation
