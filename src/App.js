import React, { Component } from 'react'
import Header from './components/Header'
import AccountForm from './components/AccountForm'
import AccountsList from './components/AccountsList'
import './App.css'
import Database from './models/Database'

class App extends Component {
  constructor() {
    super()
    this.db = {}
    this.db.accounts = Database.load('accounts')
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
