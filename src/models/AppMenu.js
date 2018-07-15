import os from 'os'
import PackageInfo from '../../package.json'

const remote = window.require('electron').remote
const shell = window.require('electron').shell
const { Menu, app } = remote

class AppMenu {
  constructor(options) {
    this.onPageChange = options.onPageChange
    this.isMac = os.release().indexOf('Macintosh') > -1
    this.altOrOption = this.isMac ? 'Option' : 'Alt'

    const template = this.getMenuTemplate()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  getMenuTemplate() {
    if (this.isMac) {
      return this.getMacMenuTemplate()
    }

    return this.getNonMacMenuTemplate()
  }

  getMacMenuTemplate() {
    return [
      {
        label: app.getName(),
        submenu: [
          this.aboutMenuItem(),
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() { app.quit() }
          }
        ]
      },
      {
        label: 'Tools',
        submenu: [
          this.developerToolsMenuItem()
        ]
      },
      {
        label: 'Help',
        submenu: [
          this.bugReportMenuItem()
        ]
      }
    ]
  }

  getNonMacMenuTemplate() {
    return [
      {
        label: 'Tools',
        submenu: [
          this.developerToolsMenuItem()
        ]
      },
      {
        label: 'Help',
        submenu: [
          this.aboutMenuItem(),
          this.bugReportMenuItem()
        ]
      }
    ]
  }

  aboutMenuItem() {
    const self = this

    return {
      label: `About ${app.getName()}`,
      click() { self.onPageChange('about') }
    }
  }

  bugReportMenuItem() {
    const self = this

    return {
      label: 'Report a bug',
      click() { shell.openExternal(PackageInfo.bugs.url) }
    }
  }

  developerToolsMenuItem() {
    return {
      label: 'Developer Tools',
      accelerator: `CmdOrCtrl+${this.altOrOption}+I`,
      click(item, win) {
        if (win) {
          win.webContents.toggleDevTools()
        }
      }
    }
  }
}

export default AppMenu
