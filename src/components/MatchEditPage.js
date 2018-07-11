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
        <div className="border-top pt-2 mt-4">
          <MatchDeleteForm
            _id={id}
            db={db}
            onDelete={this.loadMatchesPage}
          />
        </div>
      </div>
    )
  }
}

export default MatchEditPage
