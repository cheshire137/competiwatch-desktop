export type MapType = "Assault" | "Escort" | "Control" | "Hybrid";

type MapTypeToString = {
  [type in MapType]: string;
};

type MapTypeToStrings = {
  [type in MapType]: string[];
};

export const MapTypes: MapType[] = ["Assault", "Escort", "Control", "Hybrid"];

export const MapTypeAliases: MapTypeToString = {
  Assault: "2CP",
  Control: "KotH",
  Escort: "Payload",
  Hybrid: "Hybrid"
};

export const MapsByType: MapTypeToStrings = {
  Assault: [
    'Hanamura',
    'Horizon Lunar Colony',
    'Paris',
    'Temple of Anubis',
    'Volskaya Industries'
  ],
  Control: [
    'Busan',
    'Ilios',
    'Lijiang Tower',
    'Nepal',
    'Oasis'
  ],
  Escort: [
    'Dorado',
    'Havana',
    'Junkertown',
    'Rialto',
    'Route 66',
    'Watchpoint: Gibraltar'
  ],
  Hybrid: [
    'Blizzard World',
    'Eichenwalde',
    'Hollywood',
    "King's Row",
    'Numbani'
  ]
};

export default {
  names: [
    'Blizzard World',
    'Busan',
    'Dorado',
    'Eichenwalde',
    'Hanamura',
    'Havana',
    'Hollywood',
    'Horizon Lunar Colony',
    'Ilios',
    'Junkertown',
    "King's Row",
    'Lijiang Tower',
    'Nepal',
    'Numbani',
    'Oasis',
    'Paris',
    'Rialto',
    'Route 66',
    'Temple of Anubis',
    'Volskaya Industries',
    'Watchpoint: Gibraltar'
  ],
  shortNames: {
    'Blizzard World': 'B. World',
    'Horizon Lunar Colony': 'H. Lunar Colony',
    'Temple of Anubis': 'Anubis',
    'Volskaya Industries': 'Volskaya',
    'Watchpoint: Gibraltar': 'WP: Gibraltar'
  }
};
