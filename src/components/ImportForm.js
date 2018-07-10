import React, { Component } from 'react'
import Importer from '../models/Importer'

class ImportForm extends Component {
  constructor(props) {
    super(props)
    this.state = { path: '' }
  }

  onImport = event => {
    event.preventDefault()
    const { path } = this.state
    if (path.length < 1) {
      return
    }
    const importer = new Importer(path)
    importer.import().then(thing => console.log(thing))
  }

  onFileChange = event => {
    const file = event.target.files[0]
    if (!file) {
      return
    }
    this.setState(prevState => ({ path: file.path }))
  }

  render() {
    return (
      <form
        onSubmit={this.onImport}
      >
        <dl className="form-group mt-0">
          <dt><label htmlFor="csv">Choose a CSV file:</label></dt>
          <dd>
            <input
              type="file"
              id="csv"
              required
              className="form-control"
              onChange={this.onFileChange}
            />
          </dd>
        </dl>
        <button type="submit" className="btn btn-primary">
          Import matches
        </button>
      </form>
    )
  }
}

export default ImportForm
