import React, { Component } from 'react'

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
    return (
      <div className="mb-4">
        <header className="pt-3 text-gray-light">
          <div className="container">
            <h1 className="h1 lh-condensed">Competiwatch Desktop</h1>
          </div>
        </header>
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
