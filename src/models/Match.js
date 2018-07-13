import Database from './Database'

const totalPlacementMatches = 10

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

const getWinStreak = (index, matches, count) => {
  const match = matches[index]
  if (!match || !match.isWin()) {
    return count
  }

  const prevMatch = matches[index - 1]
  if (prevMatch && prevMatch.isWin()) {
    return getWinStreak(index - 1, matches, count + 1)
  }

  return getWinStreak(index - 1, matches, count)
}

const getLossStreak = (index, matches, count) => {
  const match = matches[index]
  if (!match || !match.isLoss()) {
    return count
  }

  const prevMatch = matches[index - 1]
  if (prevMatch && prevMatch.isLoss()) {
    return getLossStreak(index - 1, matches, count + 1)
  }

  return getLossStreak(index - 1, matches, count)
}

const dayOfWeek = date => {
  const day = date.getDay()
  if (day === 0 || day === 6) { // Sunday and Saturday
    return 'weekend'
  }
  return 'weekday'
}

const timeOfDay = date => {
  const hours = date.getHours()
  if (hours >= 5 && hours < 12) {
    return 'morning'
  }
  if (hours >= 12 && hours < 17) {
    return 'afternoon'
  }
  if (hours >= 17 && hours < 21) {
    return 'evening'
  }
  return 'night'
}

const defaultSort = { playedAt: 1, createdAt: 1 }

class Match {
  static setupDatabase(env) {
    const db = Database.load(`matches${env}`)
    return db
  }

  static wipeSeason(db, accountID, season) {
    return Match.findAll(db, accountID, season).then(matches => {
      const promises = matches.map(match => match.delete(db))
      return Promise.all(promises)
    })
  }

  static find(db, id) {
    return Database.find(db, id).then(data => new Match(data))
  }

  static findAll(db, accountID, season) {
    const conditions = { accountID, season }

    return Database.findAll(db, defaultSort, conditions).then(rows => {
      const matches = rows.map(data => new Match(data))

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        const prevMatch = matches[i-1]

        match.rankChange = matchRankChange(match, prevMatch)

        if (!match.result) {
          match.result = matchResult(match, prevMatch)
        }

        if (match.isWin()) {
          match.winStreak = getWinStreak(i, matches, 1)
        } else if (match.isLoss()) {
          match.lossStreak = getLossStreak(i, matches, 1)
        }
      }

      return matches
    })
  }

  constructor(data) {
    this.accountID = data.accountID
    this._id = data._id
    if (typeof data.rank === 'number' || typeof data.rank === 'string') {
      this.rank = parseInt(data.rank, 10)
    }
    this.comment = data.comment
    this.season = parseInt(data.season, 10)
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
    if (this.playedAt) {
      this.dayOfWeek = dayOfWeek(this.playedAt)
      this.timeOfDay = timeOfDay(this.playedAt)
    }
    if (data.dayOfWeek) {
      this.dayOfWeek = data.dayOfWeek
    }
    if (data.timeOfDay) {
      this.timeOfDay = data.timeOfDay
    }
    this.enemyThrower = data.enemyThrower
    this.allyThrower = data.allyThrower
    this.enemyLeaver = data.enemyLeaver
    this.allyLeaver = data.allyLeaver
    this.playOfTheGame = data.playOfTheGame
  }

  isWin() {
    return this.result === 'win'
  }

  isDraw() {
    return this.result === 'draw'
  }

  isLoss() {
    return this.result === 'loss'
  }

  async isLastPlacement(db) {
    if (!this.isPlacement) {
      return false
    }

    const conditions = {
      isPlacement: true,
      season: this.season,
      accountID: this.accountID
    }
    const placementRows = await Database.findAll(db, defaultSort, conditions)

    if (placementRows.length < totalPlacementMatches) {
      return false
    }

    const lastPlacement = placementRows[totalPlacementMatches - 1]
    return lastPlacement && lastPlacement._id === this._id
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
      timeOfDay: this.timeOfDay,
      dayOfWeek: this.dayOfWeek,
      isPlacement: this.isPlacement,
      enemyThrower: this.enemyThrower,
      allyThrower: this.allyThrower,
      enemyLeaver: this.enemyLeaver,
      allyLeaver: this.allyLeaver,
      playOfTheGame: this.playOfTheGame,
      season: this.season,
      result: this.result
    }
    return Database.upsert(db, data, this._id).then(newMatch => {
      this._id = newMatch._id
      if (newMatch.createdAt) {
        this.createdAt = newMatch.createdAt
      }
      return this
    })
  }

  delete(db) {
    return Database.delete(db, this._id, 'match')
  }
}

export default Match
