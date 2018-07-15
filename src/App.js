import React, { Component } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import Match from './models/Match'
import Season from './models/Season'
import AppMenu from './models/AppMenu'
import AccountsPage from './components/AccountsPage'
import MatchesPage from './components/MatchesPage'
import MatchCreatePage from './components/MatchCreatePage'
import SeasonsPage from './components/SeasonsPage'
import AboutPage from './components/AboutPage'
import ImportPage from './components/ImportPage'
import MatchEditPage from './components/MatchEditPage'
import './primer.css'
import './ionicons.min.css'
import './App.css'

const latestKnownSeason = 11

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 'accounts',
      latestRank: 2500,
      isPlacement: false,
      latestSeason: latestKnownSeason,
      accounts: []
    }
    this.db = {}
    const env = process.env.NODE_ENV
    this.db.accounts = Account.setupDatabase(env)
    this.db.matches = Match.setupDatabase(env)
    this.db.seasons = Season.setupDatabase(env)
  }

  onSeasonDelete = deletedNumber => {
    this.setState(prevState => {
      const newState = {}
      if (prevState.latestSeason === deletedNumber) {
        newState.latestSeason = deletedNumber - 1
      }
      if (prevState.activeSeason === deletedNumber) {
        newState.activeSeason = deletedNumber - 1
      }
      return newState
    }, this.updateAppMenu)
  }

  refreshAccounts = () => {
    Account.findAll(this.db.accounts).then(accounts => {
      this.setState(prevState => ({ accounts }), this.updateAppMenu)
    })
  }

  componentDidMount() {
    Season.latest(this.db.seasons).then(number => {
      if (number) {
        this.changeActiveSeason(number)
      } else {
        this.changeActiveSeason(latestKnownSeason)
      }
    })
    this.refreshAccounts()
  }

  setIsPlacement = (isPlacement, isLastPlacement) => {
    this.setState(prevState => ({ isPlacement, isLastPlacement }))
  }

  changeActivePage = (activePage, val1) => {
    this.setState(prevState => {
      const newState = { activePage }

      if (activePage === 'log-match') {
        if (typeof val1 === 'number') {
          newState.latestRank = val1
          newState.isPlacement = false
          newState.isLastPlacement = false
        }
        newState.activeMatchID = null
      }

      if (activePage === 'accounts') {
        newState.activeAccountID = null
        newState.latestRank = 2500
        newState.isPlacement = false
        newState.isLastPlacement = false
        newState.activeMatchID = null
      }

      if (activePage === 'matches') {
        newState.activeMatchID = null
      }

      if (activePage === 'import') {
        newState.activeMatchID = null
      }

      if (activePage === 'edit-match') {
        newState.activeMatchID = val1
      }

      return newState
    }, this.updateAppMenu)
  }

  updateAppMenu = () => {
    const { activeAccountID, activeSeason, latestSeason, accounts } = this.state

    new AppMenu({
      onPageChange: this.changeActivePage,
      onSeasonChange: this.changeActiveSeason,
      onAccountChange: this.onAccountChange,
      season: activeSeason,
      latestSeason,
      accountID: activeAccountID,
      accounts
    })
  }

  changeActiveSeason = activeSeason => {
    this.setState(prevState => {
      const newState = { activeSeason }

      if (prevState.activeMatchID) {
        newState.activeMatchID = null
      }

      if (prevState.activePage === 'edit-match' ||
          prevState.activePage === 'log-match') {
        newState.activePage = 'matches'
      }

      if (activeSeason > prevState.latestSeason) {
        newState.latestSeason = activeSeason
      }

      return newState
    }, this.updateAppMenu)
  }

  onMatchesImported = matches => {
    const { activeSeason, activeAccountID } = this.state
    console.log('imported', matches.length, 'match(es) into season', activeSeason, 'in account',
                activeAccountID)
    this.changeActivePage('matches')
  }

  onAccountChange = accountID => {
    this.setState(prevState => ({ activeAccountID: accountID, activePage: 'matches' }),
                  this.updateAppMenu)
  }

  renderActivePage = () => {
    const { activePage, activeAccountID, latestRank, isPlacement,
            isLastPlacement, activeSeason, latestSeason,
            activeMatchID, accounts } = this.state

    if (activePage === 'matches') {
      return (
        <MatchesPage
          accountID={activeAccountID}
          season={activeSeason}
          dbAccounts={this.db.accounts}
          dbMatches={this.db.matches}
          onPageChange={this.changeActivePage}
          setIsPlacement={this.setIsPlacement}
        />
      )
    }

    if (activePage === 'log-match') {
      return (
        <MatchCreatePage
          accountID={activeAccountID}
          db={this.db.matches}
          onPageChange={this.changeActivePage}
          latestRank={latestRank}
          isPlacement={isPlacement}
          season={activeSeason}
          isLastPlacement={isLastPlacement}
        />
      )
    }

    if (activePage === 'manage-seasons') {
      return (
        <SeasonsPage
          db={this.db.seasons}
          latestSeason={latestSeason}
          firstNonDeletableSeason={latestKnownSeason}
          onCreate={this.changeActiveSeason}
          onDelete={this.onSeasonDelete}
        />
      )
    }

    if (activePage === 'import') {
      return (
        <ImportPage
          season={activeSeason}
          accountID={activeAccountID}
          db={this.db.matches}
          onImport={this.onMatchesImported}
        />
      )
    }

    if (activePage === 'edit-match') {
      return (
        <MatchEditPage
          id={activeMatchID}
          db={this.db.matches}
          onPageChange={this.changeActivePage}
        />
      )
    }

    if (activePage === 'about') {
      return (
        <AboutPage
          onPageChange={this.changeActivePage}
        />
      )
    }

    return (
      <AccountsPage
        accounts={accounts}
        dbAccounts={this.db.accounts}
        dbMatches={this.db.matches}
        season={activeSeason}
        onCreate={this.refreshAccounts}
        onAccountChange={this.onAccountChange}
      />
    )
  }

  render() {
    const { activePage, activeAccountID, activeSeason, latestSeason,
            isPlacement } = this.state
    const showHeader = activePage !== 'about'

    return (
      <div className="layout-container">
        {showHeader ? (
          <Header
            activePage={activePage}
            activeAccountID={activeAccountID}
            onPageChange={this.changeActivePage}
            activeSeason={activeSeason}
            latestSeason={latestSeason}
            isPlacement={isPlacement}
            dbAccounts={this.db.accounts}
            onSeasonChange={this.changeActiveSeason}
            onAccountChange={this.onAccountChange}
          />
        ) : null}
        {this.renderActivePage()}
      </div>
    )
  }
}

export default App
