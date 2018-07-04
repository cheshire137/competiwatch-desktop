import Database from './Database'

class Account {
  static findAll(db) {
    const conditions = {}
    return new Promise((resolve, reject) => {
      db.find(conditions, (err, rows) => {
        if (err) {
          console.error('failed to look up accounts', err)
          reject(err)
        } else {
          const accounts = rows.map(data => new Account(data))
          resolve(accounts)
        }
      })
    })
  }

  constructor(data) {
    this.battletag = data.battletag
    this._id = data._id
  }

  save(db) {
    const data = { battletag: this.battletag }
    Database.upsert(db, data, this._id, 'account').then(newAccount => {
      this._id = newAccount._id
    })
  }
}

export default Account
