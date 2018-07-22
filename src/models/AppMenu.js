import os from 'os'
import PackageInfo from '../../package.json'

const remote = window.require('electron').remote
const shell = window.require('electron').shell
const { Menu, app } = remote

class AppMenu {
  constructor(options) {
    this.onPageChange = options.onPageChange
    this.onSeasonChange = options.onSeasonChange
    this.onAccountChange = options.onAccountChange
    this.latestSeason = options.latestSeason
    this.accounts = options.accounts
    this.showMatchesMenuItem = options.season && options.accountID
    this.showLogMatchMenuItem = this.showMatchesMenuItem
    this.showTrendsMenuItem = this.showMatchesMenuItem
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
    const menuItems = [
      {
        label: app.getName(),
        submenu: [
          this.aboutMenuItem(),
          this.settingsMenuItem(),
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() { app.quit() }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: this.editSubmenu()
      },
      {
        label: 'View',
        submenu: this.viewSubmenu()
      }
    ]
    if (this.accounts.length > 0) {
      menuItems.push({
        label: 'Account',
        submenu: this.accountSubmenu()
      })
    }
    menuItems.push({
      label: 'Season',
      submenu: this.seasonSubmenu()
    })
    menuItems.push({
      label: 'Tools',
      submenu: this.toolsSubmenu()
    })
    menuItems.push({
      label: 'Help',
      submenu: [
        this.bugReportMenuItem()
      ]
    })
    return menuItems
  }

  getNonMacMenuTemplate() {
    const menuItems = [
      {
        label: 'Edit',
        submenu: this.editSubmenu()
      },
      {
        label: 'View',
        submenu: this.viewSubmenu()
      }
    ]
    if (this.accounts.length > 0) {
      menuItems.push({
        label: 'Account',
        submenu: this.accountSubmenu()
      })
    }
    menuItems.push({
      label: 'Season',
      submenu: this.seasonSubmenu()
    })
    menuItems.push({
      label: 'Tools',
      submenu: this.toolsSubmenu()
    })
    menuItems.push({
      label: 'Help',
      submenu: [
        this.aboutMenuItem(),
        this.bugReportMenuItem()
      ]
    })
    return menuItems
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
      accelerator: `${this.altOrOption}+A`,
      click() { self.onPageChange('accounts') }
    }
  }

  bugReportMenuItem() {
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
      accelerator: `${this.altOrOption}+M`,
      click() { self.onPageChange('matches') }
    }
  }

  trendsMenuItem() {
    const self = this

    return {
      label: 'Trends',
      accelerator: `${this.altOrOption}+T`,
      click() { self.onPageChange('trends') }
    }
  }

  logMatchMenuItem() {
    const self = this

    return {
      label: 'Log a Match',
      accelerator: `${this.altOrOption}+L`,
      click() { self.onPageChange('log-match') }
    }
  }

  seasonMenuItem(season) {
    const self = this

    return {
      label: `Season ${season}`,
      click() { self.onSeasonChange(season) }
    }
  }

  importMatchesMenuItem() {
    const self = this

    return {
      label: 'Import Matches',
      accelerator: `${this.altOrOption}+I`,
      click() { self.onPageChange('import') }
    }
  }

  manageSeasonsMenuItem() {
    const self = this

    return {
      label: 'Manage Seasons',
      click() { self.onPageChange('manage-seasons') }
    }
  }

  seasonSubmenu() {
    const submenu = []
    for (let season = this.latestSeason; season >= 1; season--) {
      submenu.push(this.seasonMenuItem(season))
    }
    submenu.push(this.manageSeasonsMenuItem())
    return submenu
  }

  accountMenuItem(account) {
    const self = this

    return {
      label: account.battletag,
      click() { self.onAccountChange(account._id) }
    }
  }

  settingsMenuItem() {
    const self = this

    return {
      label: this.isMac ? 'Preferences' : 'Options',
      accelerator: `CmdOrCtrl+,`,
      click() { self.onPageChange('settings') }
    }
  }

  accountSubmenu() {
    const submenu = []
    for (const account of this.accounts) {
      submenu.push(this.accountMenuItem(account))
    }
    return submenu
  }

  editSubmenu() {
    const submenu = []
    submenu.push({ role: 'undo' })
    submenu.push({ role: 'redo' })
    submenu.push({ type: 'separator' })
    submenu.push({ role: 'cut' })
    submenu.push({ role: 'copy' })
    submenu.push({ role: 'paste' })
    submenu.push({ role: 'selectall' })
    return submenu
  }

  toolsSubmenu() {
    const submenu = []
    if (this.showLogMatchMenuItem) {
      submenu.push(this.importMatchesMenuItem())
    }
    if (!this.isMac) {
      submenu.push(this.settingsMenuItem())
    }
    if (!this.isMac || this.showLogMatchMenuItem) {
      submenu.push({ type: 'separator' })
    }
    submenu.push(this.developerToolsMenuItem())
    return submenu
  }

  viewSubmenu() {
    const submenu = [this.accountsMenuItem()]
    if (this.showMatchesMenuItem) {
      submenu.push(this.matchesMenuItem())
    }
    if (this.showLogMatchMenuItem) {
      submenu.push(this.logMatchMenuItem())
    }
    if (this.showTrendsMenuItem) {
      submenu.push(this.trendsMenuItem())
    }
    return submenu
  }
}

export default AppMenu
