import React, { Component } from 'react'

class ImportForm extends Component {
  onImport = event => {
    event.preventDefault()
  }

  render() {
    return (
      <form
        onSubmit={this.onImport}
      >
        <dl className="form-group mt-0">
          <dt><label htmlFor="csv">Choose a CSV file:</label></dt>
          <dd><input type="file" id="csv" required className="form-control" /></dd>
        </dl>
        <button type="submit" className="btn btn-primary">
          Import matches
        </button>
      </form>
    )
  }
}

export default ImportForm
