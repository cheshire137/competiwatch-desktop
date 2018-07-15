import Database from './Database'

class Setting {
  static findAll() {
    const sort = {}
    return Database.findAll('settings', sort)
                   .then(rows => rows.map(data => new Setting(data)))
  }

  static load() {
    return this.findAll().then(settings => {
      return settings[0] || new Setting({})
    })
  }

  constructor(data) {
    this._id = data._id
    this.defaultAccountID = data.defaultAccountID
    this.theme = data.theme || 'light'
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt)
    }
  }

  save() {
    const data = {
      defaultAccountID: this.defaultAccountID,
      theme: this.theme
    }
    return Database.upsert('settings', data, this._id).then(newSetting => {
      this._id = newSetting._id
      if (newSetting.createdAt) {
        this.createdAt = newSetting.createdAt
      }
      return this
    })
  }

  delete() {
    return Database.delete('settings', this._id, 'setting')
  }
}

export default Setting
