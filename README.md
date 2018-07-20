# Competiwatch Desktop

This is a work in progress. It's a desktop app to track your competitive match history in Overwatch.

![Screenshot of match history](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshot-2.png)

![Screenshot of settings page](https://raw.githubusercontent.com/cheshire137/competiwatch-desktop/master/screenshot-settings.png)

See [the changelog](./CHANGELOG.md) for what has changed each version.

## How to Develop

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

React logs will show in your terminal.

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
