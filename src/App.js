import React, { Component } from 'react'
import Header from './components/Header'
import './App.css'
import Datastore from 'nedb'
import path from 'path'

const remote = window.require('electron').remote

class App extends Component {
  constructor() {
    super()
    const dbDir = remote.app.getPath('userData')
    this.db = {}
    this.db.accounts = new Datastore({
      filename: path.join(dbDir, 'competiwatch-accounts.db'),
      autoload: true
    })
    this.db.accounts.loadDatabase()
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
