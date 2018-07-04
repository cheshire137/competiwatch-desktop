import React, { Component } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import Match from './models/Match'
import AccountsPage from './components/AccountsPage'
import MatchesPage from './components/MatchesPage'
import './App.css'
import './primer.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { active: 'accounts' }
    this.db = {}
    this.db.accounts = Account.setupDatabase()
    this.db.matches = Match.setupDatabase()
  }

  activePage = () => {
    const { active } = this.state
    if (active === 'matches') {
      return <MatchesPage dbAccounts={this.db.matches} />
    }
    return <AccountsPage dbAccounts={this.db.accounts} />
  }

  changeActivePage = newActive => {
    this.setState(prevState => ({ active: newActive }))
  }

  render() {
    return (
      <div className="layout-container">
        <Header
          activePage={this.state.active}
          onPageChange={this.changeActivePage}
        />
        {this.activePage()}
      </div>
    )
  }
}

export default App
