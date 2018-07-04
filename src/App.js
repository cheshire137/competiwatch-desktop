import React, { Component } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import AccountsPage from './components/AccountsPage'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.db = {}
    this.db.accounts = Account.setupDatabase()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AccountsPage dbAccounts={this.db.accounts} />
      </div>
    )
  }
}

export default App
