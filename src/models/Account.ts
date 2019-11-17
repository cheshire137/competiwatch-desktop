import Database from './Database'
import Match from './Match'

const accountSort = (a: Account, b: Account) => {
  if (!a.battletag) {
    return -1;
  }
  if (!b.battletag) {
    return 1;
  }
  const battletagA = a.battletag.toLowerCase();
  const battletagB = b.battletag.toLowerCase();
  return battletagA.localeCompare(battletagB);
};

export interface AccountData {
  _id?: string;
  battletag: string;
  createdAt?: string;
}

class Account {
  battletag: string;
  _id?: string;
  createdAt?: Date;

  static findAll() {
    const sort = { battletag: 1 } // not case-insensitive
    return Database.findAll('accounts', sort)
                   .then(rows => rows.map((data: AccountData) => new Account(data)))
                   .then(accounts => accounts.sort(accountSort))
  }

  static find(id: string) {
    return Database.find('accounts', id).then(data => new Account(data))
  }

  constructor(data: AccountData) {
    this.battletag = data.battletag
    this._id = data._id
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt)
    }
  }

  findAllGroupMembers(season: number) {
    const sort = {}
    const conditions: any = { accountID: this._id, group: { $ne: '' } }
    if (typeof season === 'number' && !isNaN(season)) {
      conditions.season = season
    }

    return Database.findAll('matches', sort, conditions).then(matchRows => {
      const matches = matchRows.map((data: any) => new Match(data))
      const groupMembers: any = {};

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

  topHeroes(season: number) {
    const sort = {}
    const conditions: any = { accountID: this._id, heroes: { $ne: '' } }
    if (typeof season === 'number' && !isNaN(season)) {
      conditions.season = season
    }

    return Database.findAll('matches', sort, conditions).then(matchRows => {
      const matches = matchRows.map((data: any) => new Match(data))
      const heroCounts: any = {}

      for (const match of matches) {
        for (const hero of match.heroList) {
          if (!(hero in heroCounts)) {
            heroCounts[hero] = 0
          }

          heroCounts[hero]++
        }
      }

      const sortableHeroCounts = []
      for (const hero in heroCounts) {
        sortableHeroCounts.push([hero, heroCounts[hero]])
      }
      sortableHeroCounts.sort((a, b) => {
        return b[1] - a[1]
      })

      return sortableHeroCounts.map(arr => arr[0]).slice(0, 3)
    })
  }

  latestMatch(season: number) {
    const conditions = { accountID: this._id, season };
    const sort = { date: -1, createdAt: -1 };

    return Database.latest('matches', conditions, sort).then(data => {
      if (data) {
        return new Match(data);
      }
    })
  }

  totalMatches(season: number) {
    const conditions: any = { accountID: this._id }
    if (typeof season === 'number') {
      conditions.season = season
    }
    return Database.count('matches', conditions)
  }

  hasMatches(season: number) {
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

export default Account;
