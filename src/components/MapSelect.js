import React, { Component } from 'react'
import Map from '../models/Map'

class MapSelect extends Component {
  onChange = event => {
    const map = event.target.value
    this.props.onChange(map)
  }

  render() {
    const { map } = this.props
    const mapTypes = Object.keys(Map.byType)

    return (
      <select
        className="form-select"
        value={map}
        onChange={this.onChange}
      >
        <option value=""></option>
        {mapTypes.map(mapType => (
          <optgroup label={mapType} key={mapType}>
            {Map.byType[mapType].map(mapName => (
              <option key={mapName} value={mapName}>{mapName}</option>
            ))}
          </optgroup>
        ))}
      </select>
    )
  }
}

export default MapSelect
