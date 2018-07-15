import Database from './Database'

class Setting {
  static setupDatabase(env) {
    return Database.load(`settings${env}`)
  }

  static findAll(db) {
    const sort = {}
    return Database.findAll(db, sort)
                   .then(rows => rows.map(data => new Setting(data)))
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
