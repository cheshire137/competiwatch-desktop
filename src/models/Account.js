import Database from './Database'
import Match from './Match'

class Account {
  static findAll() {
    const sort = { battletag: 1 }
    return Database.findAll('accounts', sort)
                   .then(rows => rows.map(data => new Account(data)))
  }

  static find(id) {
    return Database.find('accounts', id).then(data => new Account(data))
  }

  constructor(data) {
    this.battletag = data.battletag
    this._id = data._id
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt)
    }
  }

  findAllGroupMembers(season) {
    const sort = {}
    const conditions = { accountID: this._id, group: { $ne: '' } }
    if (typeof season === 'number' && !isNaN(season)) {
      conditions.season = season
    }

    return Database.findAll('matches', sort, conditions).then(matchRows => {
      const matches = matchRows.map(data => new Match(data))
      const groupMembers = {}

      for (const match of matches) {
        for (const groupMember of match.groupList) {
          if (!(groupMember in groupMembers)) {
            groupMembers[groupMember] = 1
          }
        }
      }

      return Object.keys(groupMembers).sort()
    })
  }

  latestMatch(season) {
    const conditions = { accountID: this._id, season }
    const sort = { date: -1, createdAt: -1 }

    return Database.latest('matches', conditions, sort).then(data => {
      if (data) {
        return new Match(data)
      }
    })
  }

  totalMatches(season) {
    const conditions = { accountID: this._id }
    if (typeof season === 'number') {
      conditions.season = season
    }
    return Database.count('matches', conditions)
  }

  hasMatches(season) {
    return this.totalMatches(season).then(count => count > 0)
  }

  save() {
    const data = { battletag: this.battletag }
    return Database.upsert('accounts', data, this._id).then(newAccount => {
      this._id = newAccount._id
      if (newAccount.createdAt) {
        this.createdAt = newAccount.createdAt
      }
      return this
    })
  }

  delete() {
    return Database.delete('accounts', this._id)
  }
}

export default Account
