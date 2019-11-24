export type MapType = "Assault" | "Escort" | "Control" | "Hybrid";

type MapTypeToString = {
  [type in MapType]?: string;
};

export const MapTypes: MapType[] = ["Assault", "Escort", "Control", "Hybrid"];

export const MapTypeAliases: MapTypeToString = {
  Assault: "2CP",
  Control: "KotH",
  Escort: "Payload"
};

export type AssaultMap =
  | "Hanamura"
  | "Horizon Lunar Colony"
  | "Paris"
  | "Temple of Anubis"
  | "Volskaya Industries";

export const AssaultMaps: AssaultMap[] = [
  "Hanamura",
  "Horizon Lunar Colony",
  "Paris",
  "Temple of Anubis",
  "Volskaya Industries"
];

export type ControlMap =
  | "Busan"
  | "Ilios"
  | "Lijiang Tower"
  | "Nepal"
  | "Oasis";

export const ControlMaps: ControlMap[] = [
  "Busan",
  "Ilios",
  "Lijiang Tower",
  "Nepal",
  "Oasis"
];

export type EscortMap =
  | "Dorado"
  | "Havana"
  | "Junkertown"
  | "Rialto"
  | "Route 66"
  | "Watchpoint: Gibraltar";

export const EscortMaps: EscortMap[] = [
  "Dorado",
  "Havana",
  "Junkertown",
  "Rialto",
  "Route 66",
  "Watchpoint: Gibraltar"
];

export type HybridMap =
  | "Blizzard World"
  | "Eichenwalde"
  | "Hollywood"
  | "King's Row"
  | "Numbani";

export const HybridMaps: HybridMap[] = [
  "Blizzard World",
  "Eichenwalde",
  "Hollywood",
  "King's Row",
  "Numbani"
];

export type Map = AssaultMap | ControlMap | EscortMap | HybridMap;

type MapTypeToMaps = {
  [type in MapType]: Map[];
};

export const Maps: Map[] = [
  "Blizzard World",
  "Busan",
  "Dorado",
  "Eichenwalde",
  "Hanamura",
  "Havana",
  "Hollywood",
  "Horizon Lunar Colony",
  "Ilios",
  "Junkertown",
  "King's Row",
  "Lijiang Tower",
  "Nepal",
  "Numbani",
  "Oasis",
  "Paris",
  "Rialto",
  "Route 66",
  "Temple of Anubis",
  "Volskaya Industries",
  "Watchpoint: Gibraltar"
];

export const MapsByType: MapTypeToMaps = {
  Assault: AssaultMaps,
  Control: ControlMaps,
  Escort: EscortMaps,
  Hybrid: HybridMaps
};

type MapNameToShortName = {
  [map in Map]?: string;
};

export const MapShortNames: MapNameToShortName = {
  "Blizzard World": "B. World",
  "Horizon Lunar Colony": "H. Lunar Colony",
  "Temple of Anubis": "Anubis",
  "Volskaya Industries": "Volskaya",
  "Watchpoint: Gibraltar": "WP: Gibraltar"
};
