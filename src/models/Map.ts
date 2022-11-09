export type MapType = "Escort" | "Control" | "Hybrid" | "Push";

type MapTypeToString = {
  [type in MapType]?: string;
};

export const MapTypes: MapType[] = ["Escort", "Control", "Hybrid", "Push"];

export const MapTypeAliases: MapTypeToString = {
  Control: "KotH",
  Escort: "Payload",
  Push: "Push"
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
  | "Circuit Royale"
  | "Dorado"
  | "Havana"
  | "Junkertown"
  | "Rialto"
  | "Route 66"
  | "Watchpoint: Gibraltar";

export const EscortMaps: EscortMap[] = [
  "Circuit Royale",
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
  | "Numbani"
  | "Midtown"
  | "Paraíso";

export const HybridMaps: HybridMap[] = [
  "Blizzard World",
  "Eichenwalde",
  "Hollywood",
  "King's Row",
  "Numbani",
  "Midtown",
  "Paraíso"
];

export type PushMap =
  | "Colosseo"
  | "Esperança"
  | "New Queen Street";

export const PushMaps: PushMap[] = [
  "Colosseo",
  "Esperança",
  "New Queen Street"
];

export type Map = ControlMap | EscortMap | HybridMap | PushMap;

type MapTypeToMaps = {
  [type in MapType]: Map[];
};

export const Maps: Map[] = [
  "Blizzard World",
  "Busan",
  "Circuit Royale",
  "Colosseo",
  "Dorado",
  "Eichenwalde",
  "Esperança",
//  "Hanamura",
  "Havana",
  "Hollywood",
//  "Horizon Lunar Colony",
  "Ilios",
  "Junkertown",
  "King's Row",
  "Lijiang Tower",
  "Midtown",
  "Nepal",
  "New Queen Street",
  "Numbani",
  "Oasis",
//  "Paris",
  "Rialto",
  "Route 66",
//  "Temple of Anubis",
//  "Volskaya Industries",
  "Watchpoint: Gibraltar"
];

export const MapsByType: MapTypeToMaps = {
  Control: ControlMaps,
  Escort: EscortMaps,
  Hybrid: HybridMaps,
  Push:PushMaps
};

type MapNameToShortName = {
  [map in Map]?: string;
};

export const MapShortNames: MapNameToShortName = {
  "Blizzard World": "B. World",
  //"Horizon Lunar Colony": "H. Lunar Colony",
  "New Queen Street": "N. Q. Street",
  //"Temple of Anubis": "Anubis",
  //"Volskaya Industries": "Volskaya",
  "Watchpoint: Gibraltar": "WP: Gibraltar"
};
