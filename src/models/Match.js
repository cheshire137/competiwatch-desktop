import Database from './Database'

const cleanupCommaList = str => {
  if (!str) {
    return ''
  }
  const items = str.split(',').map(str => str.trim()).
    filter(str => str && str.length > 0)
  items.sort()
  return items.join(', ')
}

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
    this.rank = data.rank
    this.comment = data.comment
    this.season = data.season
    this.map = data.map
    this.group = cleanupCommaList(data.group)
    this.heroes = cleanupCommaList(data.heroes)
    this.playedAt = data.playedAt
    this.isPlacement = data.isPlacement
    this.enemyThrower = data.enemyThrower
    this.allyThrower = data.allyThrower
    this.enemyLeaver = data.enemyLeaver
    this.allyLeaver = data.allyLeaver
    this.playOfTheGame = data.playOfTheGame
  }

  save(db) {
    const data = {
      rank: this.rank,
      comment: this.comment,
      map: this.map,
      group: this.group,
      heroes: this.heroes,
      accountID: this.accountID,
      playedAt: this.playedAt,
      isPlacement: this.isPlacement,
      enemyThrower: this.enemyThrower,
      allyThrower: this.allyThrower,
      enemyLeaver: this.enemyLeaver,
      allyLeaver: this.allyLeaver,
      playOfTheGame: this.playOfTheGame,
      season: this.season
    }
    return Database.upsert(db, data, this._id, 'match').
      then(newMatch => { this._id = newMatch._id })
  }

  delete(db) {
    return Database.delete(db, this._id, 'match')
  }
}

export default Match
