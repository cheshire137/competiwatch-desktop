import csv from 'csv'
import Match from './Match'

const fs = window.require('fs')

class CsvImporter {
  constructor(path, season, accountID) {
    this.path = path
    this.season = season
    this.accountID = accountID
  }

  readFile = () => {
    return new Promise((resolve, reject) => {
      console.log('reading', this.path)
      fs.readFile(this.path, 'latin1', (err, data) => {
        if (err) {
          console.error('failed to read file', this.path, err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  parseCsv = () => {
    return new Promise((resolve, reject) => {
      this.readFile().then(lines => {
        const options = { columns: true }
        csv.parse(lines, options, (err, data) => {
          if (err) {
            console.error('failed to parse CSV file', this.path, err)
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    })
  }

  normalizeData = hash => {
    const keys = Object.keys(hash)

    for (const key of keys) {
      const lowerKey = key.toLowerCase()
      let value = hash[key]

      if (typeof value === 'string') {
        const lowerValue = value.toLowerCase()

        if (lowerValue === 'y') {
          value = true
        } else if (lowerValue === 'n') {
          value = false
        }
      }

      hash[lowerKey] = value
    }

    return hash
  }

  importMatch = rawData => {
    const data = this.normalizeData(rawData)
    const matchData = {
      accountID: this.accountID,
      season: this.season,
      rank: data.rank,
      comment: data.comment,
      map: data.map,
      isPlacement: data.placement,
      result: data.placement ? data.result : null,
      group: data.group,
      heroes: data.heroes,
      day: data.day,
      time: data.time,
      enemyThrower: data['enemy thrower'],
      allyThrower: data['ally thrower'],
      enemyLeaver: data['enemy leaver'],
      allyLeaver: data['ally leaver']
    }
    return matchData
  }

  import() {
    return this.parseCsv().then(rows => {
      return rows.map(row => this.importMatch(row))
    })
  }
}

export default CsvImporter
