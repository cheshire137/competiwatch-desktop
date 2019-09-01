import Database from './Database'
import Season from './Season'
import DayTimeApproximator from './DayTimeApproximator'

const getPriorMatch = (match, prevMatches) => {
  if (match.season >= Season.roleQueueSeasonStart) {
    const prevMatchesInRole = prevMatches.filter(m => m.role === match.role)
    return prevMatchesInRole[prevMatchesInRole.length - 1]
  }

  return prevMatches[prevMatches.length - 1]
}

const matchRankChange = (match, prevMatches) => {
  if (!match || prevMatches.length < 1) {
    return
  }
  const priorMatch = getPriorMatch(match, prevMatches)
  if (!priorMatch) {
    return
  }
  if (typeof match.rank === 'number' && typeof priorMatch.rank === 'number') {
    return match.rank - priorMatch.rank
  }
}

const matchResult = (match, prevMatches) => {
  if (match.result) {
    return match.result
  }

  if (prevMatches.length > 0) {
    const priorMatch = getPriorMatch(match, prevMatches)
    if (match.rank > priorMatch.rank) {
      return 'win'
    }

    if (match.rank === priorMatch.rank) {
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

const defaultSort = { playedAt: 1, createdAt: 1 }

class Match {
  static wipeSeason(accountID, season) {
    return Match.findAll(accountID, season).then(matches => {
      const promises = matches.map(match => match.delete())
      return Promise.all(promises)
    })
  }

  static find(id) {
    return Database.find('matches', id).then(data => new Match(data))
  }

  static findAll(accountID, season) {
    const conditions = { accountID, season }

    return Database.findAll('matches', defaultSort, conditions).then(rows => {
      const matches = rows.map(data => new Match(data))

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i]
        const prevMatches = matches.slice(0, i)

        match.rankChange = matchRankChange(match, prevMatches)

        if (!match.result) {
          match.result = matchResult(match, prevMatches)
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
    this.comment = data.comment
    this.season = parseInt(data.season, 10)
    this.map = data.map
    this.isPlacement = data.isPlacement
    this.result = data.result

    this.role = data.role
    if (typeof this.role === 'string' && this.role.length < 1) {
      this.role = null;
    }

    if (typeof data.groupSize === 'number' && !isNaN(data.groupSize)) {
      this.groupSize = data.groupSize
    } else if (typeof data.groupSize === 'string') {
      this.groupSize = parseInt(data.groupSize, 10)
    }

    if (typeof data.rank === 'number' && !isNaN(data.rank)) {
      this.rank = data.rank
    } else if (typeof data.rank === 'string') {
      this.rank = parseInt(data.rank, 10)
    }

    this.group = cleanupCommaList(data.group)
    this.groupList = []
    if (this.group.length > 0) {
      this.groupList = this.group.split(',')
    }

    if (typeof this.groupSize !== 'number') {
      this.groupSize = this.groupList.length + 1
    }

    this.heroes = cleanupCommaList(data.heroes)
    this.heroList = []
    if (this.heroes.length > 0) {
      this.heroList = this.heroes.split(',')
    }

    if (typeof data.playedAt === 'string') {
      this.playedAt = new Date(data.playedAt)
    } else if (data.playedAt && typeof data.playedAt === 'object' && data.playedAt.constructor.name === 'Date') {
      this.playedAt = data.playedAt
    }

    if (this.playedAt) {
      this.dayOfWeek = DayTimeApproximator.dayOfWeek(this.playedAt)
      this.timeOfDay = DayTimeApproximator.timeOfDay(this.playedAt)
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
    this.joinedVoice = data.joinedVoice

    this.createdAt = data.createdAt
    if (typeof data.createdAt === 'string') {
      this.createdAt = new Date(data.createdAt)
    }
  }

  hasThrowerOrLeaver() {
    return this.hasThrower() || this.hasLeaver()
  }

  hasThrower() {
    return this.allyThrower || this.enemyThrower
  }

  hasLeaver() {
    return this.allyLeaver || this.enemyLeaver
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

  async isLastPlacement() {
    if (!this.isPlacement) {
      return false
    }

    const conditions = {
      isPlacement: true,
      season: this.season,
      accountID: this.accountID
    }
    let totalPlacementMatches = 10
    if (this.season >= Season.roleQueueSeasonStart) {
      totalPlacementMatches = 5
      conditions.role = this.role
    }
    const placementRows = await Database.findAll('matches', defaultSort, conditions)

    if (placementRows.length < totalPlacementMatches) {
      return false
    }

    const lastPlacement = placementRows[totalPlacementMatches - 1]
    return lastPlacement && lastPlacement._id === this._id
  }

  save() {
    const data = {
      rank: this.rank,
      comment: this.comment,
      map: this.map,
      group: this.group,
      groupSize: this.groupSize,
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
      joinedVoice: this.joinedVoice,
      season: this.season,
      result: this.result,
      role: this.role
    }
    return Database.upsert('matches', data, this._id).then(newMatch => {
      this._id = newMatch._id
      if (newMatch.createdAt) {
        this.createdAt = newMatch.createdAt
      }
      return this
    })
  }

  delete() {
    return Database.delete('matches', this._id)
  }
}

export default Match
