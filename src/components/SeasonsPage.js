import React, { Component } from 'react'
import SeasonForm from './SeasonForm'
import SeasonsList from './SeasonsList'

class SeasonsPage extends Component {
  returnToAccounts = event => {
    event.target.blur()
    this.props.onPageChange('accounts')
  }

  render() {
    const { latestSeason, onCreate, firstNonDeletableSeason,
            onDelete } = this.props

    return (
      <div className="container layout-children-container">
        <div className="mt-4">
          <button
            type="button"
            onClick={this.returnToAccounts}
            className="btn-link"
          >&larr; Back to your accounts</button>
        </div>
        <h1
          className="h1 mb-2 mt-4"
        >Manage Seasons</h1>
        <div className="clearfix">
          <div className="col-7 float-left">
            <SeasonsList
              latestSeason={latestSeason}
              firstNonDeletableSeason={firstNonDeletableSeason}
              onDelete={onDelete}
            />
          </div>
          <div className="col-4 float-right">
            <SeasonForm
              latestSeason={latestSeason}
              onCreate={onCreate}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SeasonsPage
