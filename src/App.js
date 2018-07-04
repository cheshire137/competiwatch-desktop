import React, { Component } from 'react'
import Header from './components/Header'
import AccountForm from './components/AccountForm'
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
        <AccountForm db={this.db.accounts} />
      </div>
    )
  }
}

export default App
