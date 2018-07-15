import stringify from '../lib/csv-stringify'
import Match from './Match'

const headers = [
  'Rank', 'Map', 'Comment', 'Date', 'Day', 'Time', 'Heroes',
  'Ally Leaver', 'Ally Thrower', 'Enemy Leaver', 'Enemy Thrower',
  'Group', 'Placement', 'Result', 'Play of the Game', 'Season',
  'Battletag'
]

const charForBoolean(boolean) {
  return boolean ? 'Y' : 'N'
}

class CsvExporter {
  constructor(path, season, account) {
    this.path = path
    this.season = season
    this.battletag = account.battletag
    this.accountID = account._id
  }

  writeFile = contents => {
    return new Promise((resolve, reject) => {
      console.log('saving', this.path)
      fs.writeFile(this.path, contents, err => {
        if (err) {
          console.error('failed to save file', this.path)
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  getMatches = db => {
    return Match.findAll(db, this.accountID, this.season)
  }

  getValueFor = (header, match) => {
    if (header === 'Rank') {
      return match.rank
    }
    if (header === 'Map') {
      return match.map
    }
    if (header === 'Comment') {
      return match.comment
    }
    if (header === 'Date') {
      return match.playedAt
    }
    if (header === 'Day') {
      return match.dayOfWeek
    }
    if (header === 'Time') {
      return match.timeOfDay
    }
    if (header === 'Heroes') {
      return match.heroList
    }
    if (header === 'Ally Leaver') {
      return charForBoolean(match.allyLeaver)
    }
    if (header === 'Enemy Leaver') {
      return charForBoolean(match.enemyLeaver)
    }
    if (header === 'Ally Thrower') {
      return charForBoolean(match.allyThrower)
    }
    if (header === 'Enemy Thrower') {
      return charForBoolean(match.enemyThrower)
    }
    if (header === 'Group') {
      return match.groupList
    }
    if (header === 'Placement') {
      return charForBoolean(match.isPlacement)
    }
    if (header === 'Play of the Game') {
      return charForBoolean(match.playOfTheGame)
    }
    if (header === 'Result') {
      return match.result
    }
    if (header === 'Season') {
      return match.season
    }
    if (header === 'Battletag') {
      return this.battletag
    }
  }

  getRowFrom = match => {
    const row = []
    for (const header of headers) {
      row.push(this.getValueFor(header, match))
    }
    return row
  }

  getRowsFrom = matches => {
    const rows = [headers]
    for (const match of matches) {
      rows.push(this.getRowFrom(match))
    }
    return rows
  }

  generateCsv = matches => {
    return new Promise((resolve, reject) => {
      const rows = this.getRowsFrom(matches)

      stringify(rows, (err, output) => {
        if (err) {
          console.error('failed to generate CSV', err)
          reject(err)
        } else {
          resolve(output)
        }
      })
    })
  }

  async export(db) {
    const matches = await this.getMatches(db)

    return this.generateCsv(matches)
      .then(csv => this.writeFile(csv))
  }
}

export default CsvExporter
