import React, { Component } from 'react'
import PackageInfo from '../../package.json'
import ElectronUtils from '../models/ElectronUtils'
import GithubApi from '../models/GithubApi'

const { remote, shell } = ElectronUtils
const { app } = remote

class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  openLink = event => {
    event.preventDefault()
    const link = event.currentTarget
    shell.openExternal(link.href)
  }

  returnToAccounts = event => {
    event.target.blur()
    this.props.onPageChange('accounts')
  }

  checkLatestVersion = event => {
    event.target.blur()
    GithubApi.latestVersion().then(latestVersion => {
      this.setState(prevState => ({ latestVersion }))
    })
  }

  openLatestVersion = event => {
    event.target.blur()
    const { latestVersion } = this.state

    if (latestVersion && latestVersion.url) {
      shell.openExternal(latestVersion.url)
    }
  }

  render() {
    const appName = app.getName()
    const version = PackageInfo.version
    const { latestVersion } = this.state

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
        >About {appName}</h1>
        <div className="clearfix mb-4">
          <div className="col-md-6 float-left">
            <div className="pr-4">
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
              <p>
                &mdash; Sarah
              </p>
            </div>
          </div>
          <div className="col-md-6 float-left">
            <div className="pl-4">
              <ul className="list-style-none">
                <li>Version {version}</li>
                <li>
                  {latestVersion ? (
                    <span>
                      {latestVersion.version === version ? (
                        <span>You have the latest version</span>
                      ) : (
                        <button
                          type="button"
                          className="btn-link"
                          onClick={this.openLatestVersion}
                        >Version {latestVersion.version} is available</button>
                      )}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn-link"
                      onClick={this.checkLatestVersion}
                    >Check for new version</button>
                  )}
                </li>
                <li>
                  <a
                    href="https://github.com/cheshire137/competiwatch-desktop/blob/master/CHANGELOG.md"
                    onClick={this.openLink}
                  >See what's new</a>
                </li>
                <li>
                  <a
                    href="https://github.com/cheshire137/competiwatch-desktop/"
                    onClick={this.openLink}
                  >View source</a>
                </li>
                <li>
                  <a
                    href="https://github.com/cheshire137/competiwatch-desktop/issues/"
                    onClick={this.openLink}
                  >Report a bug</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutPage
