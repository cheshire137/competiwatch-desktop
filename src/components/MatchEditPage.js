import React, { Component } from 'react'
import MatchDeleteForm from './MatchDeleteForm'

class MatchEditPage extends Component {
  loadMatchesPage = () => {
    this.props.onPageChange('matches')
  }

  render() {
    const { id, db } = this.props

    return (
      <div className="container layout-children-container">
        <MatchDeleteForm
          _id={id}
          db={db}
          onDelete={this.loadMatchesPage}
        />
      </div>
    )
  }
}

export default MatchEditPage
