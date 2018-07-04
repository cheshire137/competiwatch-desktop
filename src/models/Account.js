class Account {
  constructor(data) {
    this.battletag = data.battletag
    this._id = data._id
  }

  save(db) {
    const data = { battletag: this.battletag }
    if (this._id) {
      const options = {}
      db.update({ _id: this._id }, data, options, (err, numReplaced) => {
        if (err) {
          console.error('failed to update account', this._id, err)
        } else {
          console.log('updated', numReplaced, 'account(s)', this._id)
        }
      })
    } else {
      db.insert([data], (err, newAccount) => {
        if (err) {
          console.error('failed to create account', data, err)
        } else {
          console.log('saved account', newAccount)
          this._id = newAccount._id
        }
      })
    }
  }
}

export default Account
