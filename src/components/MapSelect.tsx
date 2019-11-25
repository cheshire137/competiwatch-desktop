import React from "react";
import { MapsByType, MapTypes, Map } from "../models/Map";

interface Props {
  map?: Map | null;
  onChange: (map?: Map) => void;
}

const MapSelect = ({ map, onChange }: Props) => (
  <select
    className="form-select"
    value={map || ""}
    onChange={evt =>
      evt.target.value.length > 0
        ? onChange(evt.target.value as Map)
        : onChange(undefined)
    }
  >
    <option value=""></option>
    {MapTypes.map(mapType => (
      <optgroup label={mapType} key={mapType}>
        {MapsByType[mapType].map(mapName => (
          <option key={mapName} value={mapName}>
            {mapName}
          </option>
        ))}
      </optgroup>
    ))}
  </select>
);

export default MapSelect;
