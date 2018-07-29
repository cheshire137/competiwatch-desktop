import React, { Component } from 'react'
import Account from '../models/Account'

class MainNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = { hasMatches: false }
  }

  underlineNavItemClass = (page, isButton) => {
    const { activePage } = this.props
    const pageIsFirstInNav = page === 'accounts'
    const activePageIsNotInNav = pageIsFirstInNav && activePage === 'manage-seasons'
    const classes = ['UnderlineNav-item']

    if (activePage === page || activePageIsNotInNav) {
      classes.push('selected')
    }

    if (isButton) {
      classes.push('btn-link')
    }

    return classes.join(' ')
  }

  rightSideMessage = () => {
    const { activePage } = this.props

    if (activePage === 'log-match') {
      return (
        <div
          className="text-gray text-small"
        >* All fields optional except match result</div>
      )
    }
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
        className={this.underlineNavItemClass('accounts', true)}
        onClick={this.props.onPageChange}
      >Accounts</button>
    )
  }

  renderMatchesButton = () => {
    const { activeAccountID, activePage } = this.props
    if (!activeAccountID) {
      return null
    }

    if (activePage === 'matches') {
      return (
        <span className={this.underlineNavItemClass('matches', false)}>
          Matches
        </span>
      )
    }

    return (
      <button
        name="matches"
        type="button"
        className={this.underlineNavItemClass('matches', true)}
        onClick={this.props.onPageChange}
      >Matches</button>
    )
  }

  renderTrendsButton = () => {
    const { activeAccountID, activePage } = this.props
    if (!activeAccountID) {
      return null
    }

    if (activePage === 'trends') {
      return (
        <span className={this.underlineNavItemClass('trends', false)}>
          Trends
        </span>
      )
    }

    const { hasMatches } = this.state
    if (!hasMatches) {
      return null
    }

    return (
      <button
        name="trends"
        type="button"
        className={this.underlineNavItemClass('trends', true)}
        onClick={this.props.onPageChange}
      >Trends</button>
    )
  }

  renderLogMatchButton = () => {
    const { isPlacement, activePage } = this.props

    if (activePage !== 'log-match') {
      return null
    }

    const text = isPlacement ? 'Log a placement match' : 'Log a match'
    return (
      <span
        className={this.underlineNavItemClass('log-match', false)}
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
        className={this.underlineNavItemClass('edit-match', false)}
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
        className={this.underlineNavItemClass('import', false)}
      >Import</span>
    )
  }

  checkIfHasMatches = () => {
    const { activeAccountID, activeSeason } = this.props
    const account = new Account({ _id: activeAccountID })

    account.hasMatches(activeSeason).then(hasMatches => {
      this.setState(prevState => ({ hasMatches }))
    })
  }

  componentDidMount() {
    this.checkIfHasMatches()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeAccountID !== this.props.activeAccountID ||
        prevProps.activeSeason !== this.props.activeSeason) {
      this.checkIfHasMatches()
    }
  }

  render() {
    return (
      <nav className="ml-3 border-0 UnderlineNav width-full d-flex flex-justify-between flex-items-center">
        <div className="UnderlineNav-body">
          {this.renderAccountsButton()}
          {this.renderMatchesButton()}
          {this.renderLogMatchButton()}
          {this.renderEditMatchButton()}
          {this.renderImportButton()}
          {this.renderTrendsButton()}
        </div>
        {this.rightSideMessage()}
      </nav>
    )
  }
}

export default MainNavigation
