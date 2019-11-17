import React from 'react';
import { MapsByType, MapTypes } from '../models/Map';

interface Props {
  map?: string | null;
  onChange: (map: string) => void;
}

const MapSelect = ({ map, onChange }: Props) => (
  <select
    className="form-select"
    value={map || ""}
    onChange={evt => onChange(evt.target.value)}
  >
    <option value=""></option>
    {MapTypes.map(mapType => (
      <optgroup label={mapType} key={mapType}>
        {MapsByType[mapType].map(mapName => (
          <option key={mapName} value={mapName}>{mapName}</option>
        ))}
      </optgroup>
    ))}
  </select>
);

export default MapSelect;
