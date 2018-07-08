import Database from './Database'

class Season {
  static setupDatabase() {
    const db = Database.load('seasons')
    db.ensureIndex({ fieldName: 'number', unique: true }, err => {
      if (err) {
        console.error('failed to add seasons.number index', err)
      }
    })
    return db
  }

  static latest(db) {
    const conditions = {}
    const sort = { number: -1 }
    return new Promise((resolve, reject) => {
      db.find(conditions).sort(sort).limit(1).exec((err, rows) => {
        if (err) {
          console.error('failed to load latest season', err)
          reject(err)
        } else {
          const data = rows[0]
          if (data) {
            const season = new Season(data)
            resolve(season.number)
          } else {
            resolve()
          }
        }
      })
    })
  }

  constructor(data) {
    this._id = data._id
    this.number = parseInt(data.number, 10)
  }

  save(db) {
    const data = { number: this.number }
    return Database.upsert(db, data, this._id, 'season')
                   .then(newSeason => { this._id = newSeason._id })
  }

  delete(db) {
    return new Promise((resolve, reject) => {
      const options = {}
      db.remove({ number: this.number }, options, (err, numRemoved) => {
        if (err) {
          console.error(`failed to delete season ${this.number}`)
          reject()
        } else {
          console.log('deleted', numRemoved, 'season(s)', this.number)
          resolve()
        }
      })
    })
  }
}

export default Season
