import React, { useState } from 'react'
import PackageInfo from '../../package.json'
import { openLinkInBrowser, getAppName } from "../utils/electronUtils";
import GithubApi from '../models/GithubApi'

interface Props {
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const AboutPage = ({ onPageChange }: Props) => {
  const [latestVersion, setLatestVersion] = useState<any>();

  const openLink = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    const link = event.currentTarget
    openLinkInBrowser(link.href);
  };

  const checkLatestVersion = () => {
    GithubApi.latestVersion().then(versionInfo => {
      setLatestVersion(versionInfo);
    });
  }

  const openLatestVersion = () => {
    if (latestVersion && latestVersion.url) {
      openLinkInBrowser(latestVersion.url);
    }
  };

  const version = PackageInfo.version;
  const appName = getAppName();

  return (
    <div className="container layout-children-container">
      <div className="mt-4">
        <button
          type="button"
          onClick={() => onPageChange('accounts')}
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
                onClick={openLink}
              >Electron</a><span>, </span>
              <a
                href="https://primer.github.io/"
                onClick={openLink}
              >Primer</a><span>, </span>
              <span> and </span>
              <a
                href="https://reactjs.org/"
                onClick={openLink}
              >React</a>. You can view its source code and contribute
              yourself, if you like,
              <span> on </span>
              <a
                href="https://github.com/cheshire137/competiwatch-desktop/"
                onClick={openLink}
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
                        onClick={openLatestVersion}
                      >Version {latestVersion.version} is available</button>
                    )}
                  </span>
                ) : (
                  <button
                    type="button"
                    className="btn-link"
                    onClick={checkLatestVersion}
                  >Check for new version</button>
                )}
              </li>
              <li>
                <a
                  href="https://github.com/cheshire137/competiwatch-desktop/blob/master/CHANGELOG.md"
                  onClick={openLink}
                >See what's new</a>
              </li>
              <li>
                <a
                  href="https://github.com/cheshire137/competiwatch-desktop/"
                  onClick={openLink}
                >View source</a>
              </li>
              <li>
                <a
                  href="https://github.com/cheshire137/competiwatch-desktop/issues/"
                  onClick={openLink}
                >Report a bug</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
