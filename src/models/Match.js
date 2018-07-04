import Database from './Database'

class Match {
  static setupDatabase() {
    const db = Database.load('matches')
    return db
  }

  static findAll(db) {
    return Database.findAll(db, 'match').
      then(rows => rows.map(data => new Match(data)))
  }

  constructor(data) {
    this.accountID = data.accountID
    this._id = data._id
  }

  save(db) {
    const data = { battletag: this.battletag }
    return Database.upsert(db, data, this._id, 'match').
      then(newMatch => { this._id = newMatch._id })
  }

  delete(db) {
    return Database.delete(db, this._id, 'match')
  }
}

export default Match
