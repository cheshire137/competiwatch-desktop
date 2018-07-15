import React, { Component } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import Match from './models/Match'
import Season from './models/Season'
import Setting from './models/Setting'
import AppMenu from './models/AppMenu'
import AccountsPage from './components/AccountsPage'
import MatchesPage from './components/MatchesPage'
import MatchCreatePage from './components/MatchCreatePage'
import SeasonsPage from './components/SeasonsPage'
import AboutPage from './components/AboutPage'
import ImportPage from './components/ImportPage'
import MatchEditPage from './components/MatchEditPage'
import SettingsPage from './components/SettingsPage'
import LoadingPage from './components/LoadingPage'
import './primer.css'
import './ionicons.min.css'
import './App.css'

const latestKnownSeason = 11

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestRank: 2500,
      isPlacement: false,
      latestSeason: latestKnownSeason
    }
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
    return new Promise((resolve, reject) => {
      Account.findAll(this.state.dbAccounts).then(accounts => {
        this.setState(prevState => ({ accounts }), () => {
          this.updateAppMenu()
          resolve()
        })
      })
    })
  }

  refreshLatestSeason = () => {
    Season.latest(this.state.dbSeasons).then(number => {
      if (number) {
        this.changeActiveSeason(number)
      } else {
        this.changeActiveSeason(latestKnownSeason)
      }
    })
  }

  refreshSettings = () => {
    Setting.load(this.state.dbSettings).then(settings => {
      this.setState(prevState => {
        const newState = { settings }

        if (!prevState.activeAccountID && settings.defaultAccountID) {
          newState.activeAccountID = settings.defaultAccountID
          newState.activePage = 'matches'
        } else if (!newState.activePage) {
          newState.activePage = 'accounts'
        }

        return newState
      }, this.updateAppMenu)
    })
  }

  loadDatabases() {
    return new Promise(async (resolve, reject) => {
      const env = process.env.NODE_ENV
      const dbAccounts = await Account.setupDatabase(env)
      const dbMatches = await Match.setupDatabase(env)
      const dbSeasons = await Season.setupDatabase(env)
      const dbSettings = await Setting.setupDatabase(env)

      this.setState(prevState => ({ dbAccounts, dbMatches, dbSeasons, dbSettings }), () => {
        console.log('finished loading databases')
        resolve()
      })
    })
  }

  componentDidMount() {
    this.loadDatabases().then(() => {
      this.refreshLatestSeason()
      this.refreshAccounts().then(() => {
        this.refreshSettings()
      })
    })
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

  onSettingsSaved = settings => {
    this.setState(prevState => ({
      settings,
      activePage: 'matches',
      activeAccountID: settings.defaultAccountID
    }), this.updateAppMenu)
  }

  renderActivePage = () => {
    const { activePage, activeAccountID, latestRank, isPlacement,
            isLastPlacement, activeSeason, latestSeason, dbSeasons, dbSettings,
            activeMatchID, accounts, settings, dbAccounts, dbMatches } = this.state
    const haveActiveSeason = typeof activeSeason === 'number' && !isNaN(activeSeason)

    if (activePage === 'matches' && dbAccounts && dbMatches && haveActiveSeason && activeAccountID) {
      return (
        <MatchesPage
          accountID={activeAccountID}
          season={activeSeason}
          dbAccounts={dbAccounts}
          dbMatches={dbMatches}
          onPageChange={this.changeActivePage}
          setIsPlacement={this.setIsPlacement}
        />
      )
    }

    if (activePage === 'log-match' && dbMatches && haveActiveSeason) {
      return (
        <MatchCreatePage
          accountID={activeAccountID}
          db={dbMatches}
          onPageChange={this.changeActivePage}
          latestRank={latestRank}
          isPlacement={isPlacement}
          season={activeSeason}
          isLastPlacement={isLastPlacement}
        />
      )
    }

    if (activePage === 'manage-seasons' && dbSeasons) {
      return (
        <SeasonsPage
          db={dbSeasons}
          latestSeason={latestSeason}
          firstNonDeletableSeason={latestKnownSeason}
          onCreate={this.changeActiveSeason}
          onDelete={this.onSeasonDelete}
        />
      )
    }

    if (activePage === 'import' && dbMatches && dbAccounts && haveActiveSeason && activeAccountID) {
      return (
        <ImportPage
          season={activeSeason}
          accountID={activeAccountID}
          dbMatches={dbMatches}
          dbAccounts={dbAccounts}
          onImport={this.onMatchesImported}
        />
      )
    }

    if (activePage === 'edit-match' && dbMatches && activeMatchID) {
      return (
        <MatchEditPage
          id={activeMatchID}
          db={dbMatches}
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

    if (activePage === 'settings' && dbSettings) {
      return (
        <SettingsPage
          onPageChange={this.changeActivePage}
          dbSettings={dbSettings}
          accounts={accounts}
          settings={settings}
          onSave={this.onSettingsSaved}
        />
      )
    }

    if (activePage === 'accounts' && dbAccounts && dbMatches && haveActiveSeason) {
      return (
        <AccountsPage
          accounts={accounts}
          dbAccounts={dbAccounts}
          dbMatches={dbMatches}
          season={activeSeason}
          onCreate={this.refreshAccounts}
          onDelete={this.refreshAccounts}
          onAccountChange={this.onAccountChange}
        />
      )
    }

    return <LoadingPage />
  }

  render() {
    const { activePage, activeAccountID, activeSeason, latestSeason,
            isPlacement, accounts, dbAccounts } = this.state
    const showHeader = dbAccounts && activePage !== 'about' && activePage !== 'settings'

    return (
      <div className="layout-container">
        {showHeader ? (
          <Header
            accounts={accounts}
            activePage={activePage}
            activeAccountID={activeAccountID}
            onPageChange={this.changeActivePage}
            activeSeason={activeSeason}
            latestSeason={latestSeason}
            isPlacement={isPlacement}
            dbAccounts={dbAccounts}
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
