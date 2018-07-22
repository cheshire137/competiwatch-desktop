const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
require('./electron-database')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function onTitleChange(event, suffix) {
  let title = app.getName()
  if (typeof suffix === 'string' && suffix.length > 0) {
    title += ` - ${suffix}`
  }
  mainWindow.setTitle(title)
}

function createWindow () {
  mainWindow = new BrowserWindow({ width: 1180, height: 693 })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  })
  mainWindow.loadURL(startUrl)

  if (process.env.ELECTRON_START_URL) {
    // Open the DevTools when running app in development mode
    mainWindow.webContents.openDevTools()
  }

  mainWindow.webContents.on('did-finish-load', () => {
    ipcMain.on('title', onTitleChange)
  })

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
