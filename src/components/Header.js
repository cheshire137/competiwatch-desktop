import React, { Component } from 'react'

class Header extends Component {
  changeActivePage = event => {
    event.target.blur()
    const active = event.target.name
    this.props.onPageChange(active)
  }

  pageButtonClass = page => {
    if (this.props.activePage === page) {
      return 'breadcrumb-item btn-link breadcrumb-item-selected'
    }
    return 'breadcrumb-item btn-link'
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
        <nav aria-label="Breadcrumb">
          <div className="container">
            <ol>
              <button
                name="accounts"
                type="button"
                className={this.pageButtonClass('accounts')}
                onClick={this.changeActivePage}
              >Accounts</button>
              {this.renderMatchesButton()}
            </ol>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
