import React, { Component } from 'react'
import path from 'path'
import ElectronUtils from '../models/ElectronUtils'

const { ipcRenderer, shell } = ElectronUtils

class DatabaseFileLink extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { dbName, showDirectory } = this.props
    const replyTo = `get-db-path-${dbName}`

    ipcRenderer.once(replyTo, (event, dbPath) => {
      const filename = path.basename(dbPath)
      const dbDir = path.dirname(dbPath)
      this.setState(prevState => ({ dbPath, dbFile: filename, dbDir }))
    })
    ipcRenderer.send('get-db-path', replyTo, dbName)
  }

  openInExplorer = event => {
    event.currentTarget.blur()

    const { dbDir } = this.state
    if (!dbDir || dbDir.length < 1) {
      return
    }

    shell.openItem(dbDir)
  }

  render() {
    const { label, showDirectory } = this.props
    const { dbFile, dbDir } = this.state

    return (
      <div>
        {showDirectory ? (
          <p>
            <button
              type="button"
              onClick={this.openInExplorer}
              className="btn-link text-left ws-normal"
            >{dbDir}</button>
          </p>
        ) : null}
        <div className="d-flex">
          <strong className="d-inline-block mr-2 no-wrap">{label}</strong>
          <span>{dbFile}</span>
        </div>
      </div>
    )
  }
}

export default DatabaseFileLink
