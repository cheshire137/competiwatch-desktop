import React, { Component } from 'react'
import ElectronUtils from '../models/ElectronUtils'

const { shell } = ElectronUtils

class HelpPage extends Component {
  openLink = event => {
    event.preventDefault()
    const link = event.currentTarget
    shell.openExternal(link.href)
  }

  returnToAccounts = event => {
    event.target.blur()
    this.props.onPageChange('accounts')
  }

  loadAboutPage = event => {
    event.target.blur()
    this.props.onPageChange('about')
  }

  render() {
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
        >Help</h1>
        <div className="clearfix mb-4">
          <div className="col-md-6 float-left">
            <h2 className="h3 mb-2 text-normal">F.A.Q.</h2>
            <dl className="mr-4-md">
              <dt className="mb-1 text-bold">Does Competiwatch log my matches for me?</dt>
              <dd className="mb-4">
                No. You have to manually enter data after your games in order to see
                trends and other data about your competitive season. You might be interested
                in <a
                  href="https://overtrack.gg/"
                  onClick={this.openLink}
                >OverTrack</a> if you want automated tracking.
              </dd>
              <dt className="mb-1 text-bold">How much data do I have to enter when logging matches?</dt>
              <dd className="mb-4">
                <p>When logging placement matches, the result of the match
                (win/loss/draw) is required. For regular matches, only your new SR is required.</p>
                All other fields, like the map, heroes you played, and people you grouped
                with, are optional. However, if you don't fill in a field, you won't see trends
                about it. For example, if you never log the map you played on, you won't see a
                chart of win percentage by map.
              </dd>
              <dt className="mb-1 text-bold">Where do I get CSV files to import match data?</dt>
                <dd className="mb-4">
                  If you've been logging your competitive matches in a spreadsheet with a tool
                  like Excel or Google Sheets, you can produce a CSV (comma-separated value) file
                  of the data you've already logged. Then you can import this CSV file into
                  Competiwatch so you don't have to manually re-enter all those matches.
                </dd>
                <dt className="mb-1 text-bold">How much does it cost to use Competiwatch?</dt>
                <dd className="mb-4">
                  It's free! <span role="img" aria-label="Tada">🎉</span> See <button
                    type="button"
                    className="btn-link"
                    onClick={this.loadAboutPage}
                  >the about page</button> for
                  more information, but Competiwatch is my hobby project. Pull requests
                  are welcome <a
                    href="https://github.com/cheshire137/competiwatch-desktop/"
                    onClick={this.openLink}
                  >on GitHub</a> if you want to help out.
                </dd>
            </dl>
          </div>
          <div className="col-md-6 float-left">
            <h2 className="h3 mb-2 text-normal">Something not working?</h2>
            <p>
              <span>Please </span>
              <a
                href="https://github.com/cheshire137/competiwatch-desktop/issues"
                onClick={this.openLink}
              >open an issue</a>
              <span> on </span>
              GitHub with details about what isn't working
              in the app. Steps to reproduce the problem will be very helpful!
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default HelpPage
