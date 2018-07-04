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
    const dbFile = path.join(dbDir, 'competiwatch-desktop.db')
    this.db = new Datastore({ filename: dbFile, autoload: true })
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
