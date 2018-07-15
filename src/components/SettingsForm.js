import React, { Component } from 'react'
import Setting from '../models/Setting'

class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  refreshSettings = () => {
    const { db } = this.props

    Setting.findAll(db).then(settings => {
      this.setState(prevState => ({ settings }))
    })
  }

  componentDidMount() {
    this.refreshSettings()
  }

  render() {
    const { settings } = this.state

    return (
      <form>
        {settings ? (
          <div>
          </div>
        ) : (
          <div className="blankslate">
            <h1>
              <span className="ion ion-md-refresh mr-3 ion-spin" />
              Loading...
            </h1>
          </div>
        )}
      </form>
    )
  }
}

export default SettingsForm
