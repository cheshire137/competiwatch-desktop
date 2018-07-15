import os from 'os'
import PackageInfo from '../../package.json'

const remote = window.require('electron').remote
const shell = window.require('electron').shell
const { Menu, app } = remote

class AppMenu {
  constructor(options) {
    this.onPageChange = options.onPageChange
    this.showMatchesMenuItem = options.season && options.accountID
    this.showLogMatchMenuItem = this.showMatchesMenuItem
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
        label: 'View',
        submenu: this.viewSubmenu()
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
        label: 'View',
        submenu: this.viewSubmenu()
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

  accountsMenuItem() {
    const self = this

    return {
      label: 'Accounts',
      accelerator: `CmdOrCtrl+A`,
      click() { self.onPageChange('accounts') }
    }
  }

  bugReportMenuItem() {
    const self = this

    return {
      label: 'Report a Bug',
      click() { shell.openExternal(PackageInfo.bugs.url) }
    }
  }

  developerToolsMenuItem() {
    return {
      label: 'Toggle Developer Tools',
      accelerator: `CmdOrCtrl+${this.altOrOption}+I`,
      click(item, win) {
        if (win) {
          win.webContents.toggleDevTools()
        }
      }
    }
  }

  matchesMenuItem() {
    const self = this

    return {
      label: 'Matches',
      accelerator: `CmdOrCtrl+M`,
      click() { self.onPageChange('matches') }
    }
  }

  logMatchMenuItem() {
    const self = this

    return {
      label: 'Log a Match',
      accelerator: `CmdOrCtrl+L`,
      click() { self.onPageChange('log-match') }
    }
  }

  viewSubmenu() {
    const submenu = [this.accountsMenuItem()]
    if (this.showMatchesMenuItem) {
      submenu.push(this.matchesMenuItem())
    }
    if (this.showLogMatchMenuItem) {
      submenu.push(this.logMatchMenuItem())
    }
    return submenu
  }
}

export default AppMenu
