import React, { Component } from 'react'

class Header extends Component {
  changeActivePage = event => {
    event.target.blur()
    const active = event.target.name
    this.props.onPageChange(active)
  }

  pageButtonClass = page => {
    if (this.props.activePage === page) {
      return 'UnderlineNav-item btn-link selected'
    }
    return 'UnderlineNav-item btn-link'
  }

  renderMatchesButton = () => {
    if (!this.props.activeAccountID) {
      return null
    }

    return (
      <button
        name="matches"
        type="button"
        className={this.pageButtonClass('matches')}
        onClick={this.changeActivePage}
      >Matches</button>
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
        <nav className="UnderlineNav">
          <div className="container">
            <div className="UnderlineNav-body">
              {this.renderMatchesButton()}
              <button
                name="accounts"
                type="button"
                className={this.pageButtonClass('accounts')}
                onClick={this.changeActivePage}
              >Accounts</button>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
