import os from 'os'
const remote = window.require('electron').remote
const { Menu, app } = remote

class AppMenu {
  constructor(options) {
    this.onPageChange = options.onPageChange

    const template = this.getMenuTemplate()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  getMenuTemplate() {
    if (os.release().indexOf('Macintosh') > -1) {
      return this.getMacMenuTemplate()
    }

    return this.getNonMacMenuTemplate()
  }

  getMacMenuTemplate() {
    return [{
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
    }]
  }

  getNonMacMenuTemplate() {
    return [{
      label: 'Help',
      submenu: [
        this.aboutMenuItem()
      ]
    }]
  }

  aboutMenuItem() {
    const self = this
    return {
      label: `About ${app.getName()}`,
      click() { self.onPageChange('about') }
    }
  }
}

export default AppMenu
