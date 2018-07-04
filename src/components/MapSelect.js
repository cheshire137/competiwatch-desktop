import React, { Component } from 'react'

class MapSelect extends Component {
  onChange = event => {
    const map = event.target.value
    this.props.onChange(map)
  }

  render() {
    const { map } = this.props

    return (
      <select
        className="form-select"
        value={map}
        onChange={this.onChange}
      >
        <option value=""></option>
        <optgroup label="Assault">
          <option value="Hanamura">Hanamura</option>
          <option value="Horizon Lunar Colony">Horizon Lunar Colony</option>
          <option value="Temple of Anubis">Temple of Anubis</option>
          <option value="Volskaya Industries">Volskaya Industries</option>
        </optgroup>
        <optgroup label="Escort">
          <option value="Dorado">Dorado</option>
          <option value="Junkertown">Junkertown</option>
          <option value="Rialto">Rialto</option>
          <option value="Route 66">Route 66</option>
          <option value="Watchpoint: Gibraltar">Watchpoint: Gibraltar</option>
        </optgroup>
        <optgroup label="Hybrid">
          <option value="Blizzard World">Blizzard World</option>
          <option value="Eichenwalde">Eichenwalde</option>
          <option value="Hollywood">Hollywood</option>
          <option value="King's Row">King's Row</option>
          <option value="Numbani">Numbani</option>
        </optgroup>
        <optgroup label="Control">
          <option value="Ilios">Ilios</option>
          <option value="Lijiang Tower">Lijiang Tower</option>
          <option value="Nepal">Nepal</option>
          <option value="Oasis">Oasis</option>
        </optgroup>
      </select>
    )
  }
}

export default MapSelect
