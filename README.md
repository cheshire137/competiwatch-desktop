# Competiwatch Desktop

**[Download the app](https://github.com/cheshire137/competiwatch-desktop/releases)**

This is a work in progress. It's a desktop app for Windows and macOS to track
your competitive match history in Overwatch.

![Screenshot of match history](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshot-matches.png)

![Screenshot of settings page](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshot-settings.png)

![Screenshot of log match form](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshot-log-match.png)

See [the changelog](./CHANGELOG.md) for what has changed each version.

## Features

- Track matches across multiple Battle.net accounts and competitive seasons
- Log details such as your new SR, which people you played with, whether you were in a 6-stack or solo queuing, what time you played, whether you got Play of the Game, which heroes you played, and what map you played
- Export your match history as a CSV file (Comma-Separated Value)
- Import your match history for past seasons
- View charts summarizing your season
- Log your placement matches and regular season games
- See when you go on win streaks or loss streaks
- Choose between a dark and light theme
- Works in Windows and macOS

## How to Develop

This app was built with node version 8.11.3 and npm version 3.10.8. See [the contributing guidelines](./CONTRIBUTING.md).

```bash
npm install
npm run dev
```

The app should launch and also open in your browser. You can close the
browser tab.

### Log Files

While you run the app, Electron logs will end up in the following places:

- on macOS: `~/Library/Logs/Competiwatch/log.log`
- on Windows: `%USERPROFILE%\AppData\Roaming\Competiwatch\log.log`
- on Linux: `~/.config/Competiwatch/log.log`

React logs will show in your terminal. You can run
`tail -f ~/Library/Logs/Competiwatch/log.log` in macOS in a separate
terminal from `npm run dev` to monitor Electron logs while the app is running.

## How to Build Executables

For macOS, from a Mac run:

```bash
npm run electron-build-macos
```

This will produce a new directory in dist/ that has a distributable .app file.

For Windows, from a Windows machine run:

```bash
npm run electron-build-windows
```

This will produce new directories in dist/ with .exe files.
