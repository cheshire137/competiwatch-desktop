import React, { Component } from 'react'
import Match from '../models/Match'

class MatchDeleteForm extends Component {
  deleteMatch = event => {
    event.preventDefault()
    const message = 'Are you sure you want to delete this match?'
    if (window.confirm(message)) {
      const { _id, db, onDelete } = this.props
      const account = new Match({ _id })
      account.delete(db).then(onDelete)
    }
  }

  render() {
    return (
      <form onSubmit={this.deleteMatch}>
        <button
          type="submit"
          className="btn-link text-red tooltipped tooltipped-w"
          aria-label="Delete this match"
        >&times;</button>
      </form>
    )
  }
}

export default MatchDeleteForm
