import stringify from '../lib/csv-stringify'
import Match from './Match'
import isElectron from 'is-electron'

const headers = [
  'Battletag', 'Season', 'Role', 'Rank', 'Rank Change', 'Result', 'Win Streak', 'Loss Streak',
  'Placement', 'Map', 'Comment', 'Date', 'Day', 'Time', 'Heroes', 'Group', 'Group Size',
  'Play of the Game', 'Ally Leaver', 'Ally Thrower', 'Enemy Leaver', 'Enemy Thrower',
  'Joined Voice'
]

const charForBoolean = boolean => {
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
      if (isElectron()) {
        window.fs.writeFile(this.path, contents, err => {
          if (err) {
            console.error('failed to save file', this.path)
            reject(err)
          } else {
            resolve()
          }
        })
      } else {
        reject('not electron, cannot write to filesystem')
      }
    })
  }

  getMatches = () => {
    return Match.findAll(this.accountID, this.season)
  }

  getValueFor = (header, match) => {
    if (header === 'Rank') {
      return match.rank
    }
    if (header === 'Role') {
      return match.role
    }
    if (header === 'Rank Change') {
      return match.rankChange
    }
    if (header === 'Win Streak') {
      return match.winStreak
    }
    if (header === 'Loss Streak') {
      return match.lossStreak
    }
    if (header === 'Map') {
      return match.map
    }
    if (header === 'Comment') {
      return match.comment
    }
    if (header === 'Date') {
      if (match.playedAt) {
        return match.playedAt.toISOString()
      }
    }
    if (header === 'Day') {
      return match.dayOfWeek
    }
    if (header === 'Time') {
      return match.timeOfDay
    }
    if (header === 'Heroes') {
      return match.heroList.join(', ')
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
      return match.groupList.join(', ')
    }
    if (header === 'Group Size') {
      return match.groupSize
    }
    if (header === 'Placement') {
      return charForBoolean(match.isPlacement)
    }
    if (header === 'Play of the Game') {
      return charForBoolean(match.playOfTheGame)
    }
    if (header === 'Joined Voice') {
      return charForBoolean(match.joinedVoice)
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

  async export() {
    const matches = await this.getMatches()

    return this.generateCsv(matches)
      .then(csv => this.writeFile(csv))
  }
}

export default CsvExporter
