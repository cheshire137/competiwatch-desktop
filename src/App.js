import React, { Component } from 'react'
import Header from './components/Header'
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
      </div>
    )
  }
}

export default App
