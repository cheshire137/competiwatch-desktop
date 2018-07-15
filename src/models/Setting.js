import Database from './Database'

class Setting {
  static async setupDatabase(env) {
    const db = await Database.load(`settings-${env}`)
    return db
  }

  static findAll(db) {
    const sort = {}
    return Database.findAll(db, sort)
                   .then(rows => rows.map(data => new Setting(data)))
  }

  static load(db) {
    return this.findAll(db).then(settings => {
      return settings[0] || new Setting({})
    })
  }

  constructor(data) {
    this._id = data._id
    this.defaultAccountID = data.defaultAccountID
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt)
    }
  }

  save(db) {
    const data = {
      defaultAccountID: this.defaultAccountID
    }
    return Database.upsert(db, data, this._id).then(newSetting => {
      this._id = newSetting._id
      if (newSetting.createdAt) {
        this.createdAt = newSetting.createdAt
      }
      return this
    })
  }

  delete(db) {
    return Database.delete(db, this._id, 'setting')
  }
}

export default Setting
