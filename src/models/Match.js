import Database from './Database'

const matchRankChange = (match, prevMatch) => {
  if (prevMatch && typeof match.rank === 'number' && typeof prevMatch.rank === 'number') {
    return match.rank - prevMatch.rank
  }
}

const matchResult = (match, prevMatch) => {
  if (match.result) {
    return match.result
  }

  if (prevMatch) {
    if (match.rank > prevMatch.rank) {
      return 'win'
    }

    if (match.rank === prevMatch.rank) {
      return 'draw'
    }

    return 'loss'
  }
}

const cleanupCommaList = str => {
  if (!str) {
    return ''
  }

  const items = str.split(',').map(str => str.trim())
    .filter(str => str && str.length > 0)
  items.sort()
  return items.join(',')
}

class Match {
  static setupDatabase() {
    const db = Database.load('matches')
    return db
  }

  static findAll(db, accountID) {
    const sort = { playedAt: 1, createdAt: 1 }
    const conditions = { accountID }

    return Database.findAll(db, sort, conditions).then(rows => {
      const matches = rows.map(data => new Match(data))

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        const prevMatch = matches[i-1]

        match.rankChange = matchRankChange(match, prevMatch)

        if (!match.result) {
          match.result = matchResult(match, prevMatch)
        }
      }

      return matches
    })
  }

  constructor(data) {
    this.accountID = data.accountID
    this._id = data._id
    this.rank = data.rank
    this.comment = data.comment
    this.season = data.season
    this.map = data.map
    this.isPlacement = data.isPlacement
    this.result = data.result
    this.group = cleanupCommaList(data.group)
    this.groupList = []
    if (this.group.length > 0) {
      this.groupList = this.group.split(',')
    }
    this.heroes = cleanupCommaList(data.heroes)
    this.heroList = []
    if (this.heroes.length > 0) {
      this.heroList = this.heroes.split(',')
    }
    if (data.playedAt) {
      this.playedAt = new Date(data.playedAt)
    }
    this.enemyThrower = data.enemyThrower
    this.allyThrower = data.allyThrower
    this.enemyLeaver = data.enemyLeaver
    this.allyLeaver = data.allyLeaver
    this.playOfTheGame = data.playOfTheGame
  }

  prettyPlayedAt() {
    if (!this.playedAt) {
      return ''
    }

    return this.playedAt.toLocaleDateString()
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
      season: this.season,
      result: this.result
    }
    return Database.upsert(db, data, this._id, 'match')
      .then(newMatch => { this._id = newMatch._id })
  }

  delete(db) {
    return Database.delete(db, this._id, 'match')
  }
}

export default Match
