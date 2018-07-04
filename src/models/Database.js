import Datastore from 'nedb'
import path from 'path'

const remote = window.require('electron').remote

class Database {
  static load(name) {
    const dbDir = remote.app.getPath('userData')
    const filename = path.join(dbDir, `competiwatch-${name}.db`)
    const db = new Datastore({ filename, autoload: true })
    console.log('loading database', filename)
    db.loadDatabase()
    return db
  }
}

export default Database
