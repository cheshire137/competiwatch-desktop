import React, { Component } from 'react'

const remote = window.require('electron').remote
const shell = window.require('electron').shell
const { app } = remote

class AboutPage extends Component {
  openLink = event => {
    event.preventDefault()
    const link = event.currentTarget
    shell.openExternal(link.href)
  }

  returnToAccounts = event => {
    event.target.blur()
    this.props.onPageChange('accounts')
  }

  render() {
    const appName = app.getName()

    return (
      <div className="container layout-children-container">
        <div className="col-md-6 mt-4">
          <button
            type="button"
            onClick={this.returnToAccounts}
            className="btn-link"
          >&larr; Back to your accounts</button>
          <h1 className="h1 mb-2 mt-4">About {appName}</h1>
          <p>
            I built {appName} because I got tired of tracking my games in Google
            Sheets each competitive season. Initially {appName} was a web app,
            but I wanted a way to let people store their own data without the need
            for it to be hosted online. Hence this desktop app was born.
          </p>
          <p>
            {appName} is built
            <span> using </span>
            <a
              href="https://electronjs.org/"
              onClick={this.openLink}
            >Electron</a><span>, </span>
            <a
              href="https://primer.github.io/"
              onClick={this.openLink}
            >Primer</a><span>, </span>
            <span> and </span>
            <a
              href="https://reactjs.org/"
              onClick={this.openLink}
            >React</a>. You can view its source code and contribute
            yourself, if you like,
            <span> on </span>
            <a
              href="https://github.com/cheshire137/competiwatch-desktop/"
              onClick={this.openLink}
            >GitHub</a>.
          </p>
          <p>
            Thank you to Blizzard for making Overwatch.
            <span> <span role="img" aria-label="Heart">❤️</span> </span>
            I own none of the concepts, hero images, or competitive rank images,
            that's all Blizzard.
          </p>
          <p className="mb-4">
            &mdash; Sarah
          </p>
        </div>
      </div>
    )
  }
}

export default AboutPage
