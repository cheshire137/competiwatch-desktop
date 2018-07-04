import Database from './Database'

class Account {
  constructor(data) {
    this.data = data
  }

  save(db) {
    db.insert([this.data], function(err) {
      console.error('failed to create account', err)
    })
  }
}

export default Account
