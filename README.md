# Competiwatch Desktop

[![Build Status](https://travis-ci.org/cheshire137/competiwatch-desktop.svg?branch=master)](https://travis-ci.org/cheshire137/competiwatch-desktop)

**[Download the app](https://github.com/cheshire137/competiwatch-desktop/releases/latest)** - [see what's new](./CHANGELOG.md)

This is a desktop app for Windows and macOS to track
your competitive match history in Overwatch. I wanted to see
my progress over time, more than what the game or sites like
Overbuff provide. The app lets you see which heroes you're performing
best on, which roles, whether you do better on weekday mornings or
weekend evenings, whether joining voice chat helps your win rate,
that sort of thing.

![Screenshot of match history](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshots/screenshot-matches-windows.png)

![Screenshot of log match form](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshots/log-match.png)

![Screenshot of trends page](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshots/screenshot-trends.png)

![Screenshot of settings page](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshots/screenshot-settings.png)

![Screenshot of accounts page](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshots/accounts-list.png)

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

## How to Install

For version 1.9 and later, download the Windows installer from the [latest release](https://github.com/cheshire137/competiwatch-desktop/releases/latest). I've tested this on Windows 7 and Windows 10. Just run the installer and a Competiwatch shortcut will be added to your desktop.

You can also download the non-installer version and unzip the folder wherever you'd like. Run the app via the Competiwatch.exe executable in that folder.

You will probably be prompted by Windows that the app is unrecognized; the message in Windows 10 reads "Windows SmartScreen prevented an unrecognized app from starting." Sorry about that, it's [being worked on](https://github.com/cheshire137/competiwatch-desktop/issues/34). You can choose to run the app anyway (hit "more info" in Windows 10) and it shouldn't prompt you again for that version.

## How to Uninstall

If you installed via the installer in Windows, just use the Control Panel and Add/Remove Programs to uninstall Competiwatch. The shortcut should be removed from your desktop.

If you did not use the installer, you can just delete the folder that has Competiwatch.exe in it, wherever you unzipped that folder.

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

## How to Run Tests

```bash
npm install
npm test
```

To see test coverage, run `npm test -- --coverage`. A coverage report will
display in your terminal or you can open coverage/lcov-report/index.html in
your browser.

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

Then you can run `npm run electron-build-windows-installer` to generate an installer in dist/installers/.
