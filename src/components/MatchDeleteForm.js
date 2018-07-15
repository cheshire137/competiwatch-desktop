import React, { Component } from 'react'
import Match from '../models/Match'

class MatchDeleteForm extends Component {
  deleteMatch = event => {
    event.preventDefault()
    const message = 'Are you sure you want to delete this match?'

    if (window.confirm(message)) {
      const { _id, onDelete } = this.props
      const account = new Match({ _id })

      account.delete().then(onDelete)
    }
  }

  render() {
    return (
      <form className="mb-4" onSubmit={this.deleteMatch}>
        <button
          type="submit"
          className="btn-link text-red text-small"
        >Delete match</button>
      </form>
    )
  }
}

export default MatchDeleteForm
