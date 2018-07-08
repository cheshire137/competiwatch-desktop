import React, { Component } from 'react'
import Season from '../models/Season'

class SeasonDeleteForm extends Component {
  deleteSeason = event => {
    event.preventDefault()
    const { db, onDelete, season } = this.props
    const message = `Are you sure you want to delete season ${season}?`
    if (window.confirm(message)) {
      new Season({ number: season }).delete(db).then(() => {
        onDelete(season)
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.deleteSeason}>
        <button
          type="submit"
          className="btn-link text-red text-small"
        >Delete season</button>
      </form>
    )
  }
}

export default SeasonDeleteForm
