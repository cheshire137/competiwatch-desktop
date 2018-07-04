import React, { Component } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import AccountForm from './components/AccountForm'
import AccountsList from './components/AccountsList'
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
        <AccountsList db={this.db.accounts} />
        <AccountForm db={this.db.accounts} />
      </div>
    )
  }
}

export default App
