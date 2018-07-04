import Datastore from 'nedb'
import path from 'path'

const remote = window.require('electron').remote

class Database {
  static load(name) {
    const dbDir = remote.app.getPath('userData')
    const db = new Datastore({
      filename: path.join(dbDir, `competiwatch-${name}.db`),
      autoload: true
    })
    db.loadDatabase()
    return db
  }
}

export default Database
