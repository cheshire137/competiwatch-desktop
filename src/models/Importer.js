import csv from 'csv'
const fs = window.require('fs')

class Importer {
  constructor(path) {
    this.path = path
  }

  import() {
    return new Promise((resolve, reject) => {
      console.log('importing', this.path)
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default Importer
