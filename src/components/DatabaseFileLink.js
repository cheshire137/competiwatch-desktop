import React, { Component } from 'react'
import SettingsForm from './SettingsForm'

const { ipcRenderer, shell } = window.require('electron')

class DatabaseFileLink extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { dbName } = this.props
    const replyTo = `get-db-path-${dbName}`

    ipcRenderer.once(replyTo, (event, dbPath) => {
      this.setState(prevState => ({ dbPath }))
    })
    ipcRenderer.send('get-db-path', replyTo, dbName)
  }

  openInExplorer = event => {
    event.currentTarget.blur()

    const { dbPath } = this.state
    if (!dbPath || dbPath.length < 1) {
      return
    }

    shell.showItemInFolder(dbPath)
  }

  render() {
    const { label } = this.props
    const { dbPath } = this.state

    return (
      <div className="d-flex">
        <span className="d-inline-block mr-2 no-wrap">{label}</span>
        <button
          type="button"
          onClick={this.openInExplorer}
          className="btn-link text-left ws-normal"
        >{dbPath}</button>
      </div>
    )
  }
}

export default DatabaseFileLink
