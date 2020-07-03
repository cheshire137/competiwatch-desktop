import { theme as primer } from "@primer/components";
import { colors } from "@primer/primitives";

const darkTheme = {
  backgroundColor: '#24292e',
  color: '#e1e4e8',
  linkColor: colors.blue[3],
  borderColor: colors.gray[8],
  headerLinkColor: colors.white,
  headerLinkBackgroundColor: colors.gray[9],
  buttonShownOnHoverColor: colors.gray[3],
  blankslateBackgroundColor: "#494949",
  blankslateBorderColor: "#2f363d",
  headerBorderColor: "#2f363d",
  headerBackgroundColor: "#212b49",
  placementMatchCellBackgroundColor: "#3a434b",
  mapBackgroundColors: {
    "Junkertown": "#b57e0a",
    "Hanamura": "#86385c",
    "Temple of Anubis": "#a76c40",
    "Volskaya Industries": "#7063b7",
    "Dorado": "#a15e31",
    "Route 66": "#994e49",
    "Watchpoint: Gibraltar": "#58423f",
    "Eichenwalde": "#546857",
    "Busan": "#d56c43",
    "Blizzard World": "#0471bb",
    "Havana": "#44867b",
    "Hollywood": "#c68664",
    "King's Row": "#425a5c",
    "Numbani": "#566036",
    "Paris": "#7c6785",
    "Ilios": "#788bce",
    "Lijiang Tower": "#b55f4e",
    "Nepal": "#5a7cc6",
    "Oasis": "#b37061",
    "Horizon Lunar Colony": "#3d3939",
    "Rialto": "#789c86"
  }
};

const lightTheme = {
  backgroundColor: colors.white,
  linkColor: colors.blue[5],
  borderColor: colors.gray[2],
  headerLinkColor: colors.gray[9],
  headerLinkBackgroundColor: colors.white,
  buttonShownOnHoverColor: colors.gray[8],
  blankslateBackgroundColor: "#fafbfc",
  blankslateBorderColor: "#e1e4e8",
  headerBorderColor: "#000",
  headerBackgroundColor: "#bed6ed",
  placementMatchCellBackgroundColor: "#efefef",
  mapBackgroundColors: {
    "Junkertown": "#f4b531",
    "Hanamura": "#f9e4f8",
    "Temple of Anubis": "#edc28e",
    "Volskaya Industries": "#b0a9d7",
    "Dorado": "#d19267",
    "Route 66": "#ddbf9f",
    "Watchpoint: Gibraltar": "#c0a6b5",
    "Eichenwalde": "#a1ad7b",
    "Busan": "#f19554",
    "Blizzard World": "#2aa6fb",
    "Havana": "#77e3d1",
    "Hollywood": "#92d8fd",
    "King's Row": "#a1bfc5",
    "Numbani": "#cad298",
    "Paris": "#f0d5c0",
    "Ilios": "#a0eafd",
    "Lijiang Tower": "#d3a096",
    "Nepal": "#deeafe",
    "Oasis": "#fdf4a6",
    "Horizon Lunar Colony": "#c6c5c0",
    "Rialto": "#87d0a4"
  }
};

export default function(themeName: string) {
  if (themeName === "dark") {
    return Object.assign({}, primer, darkTheme);
  }

  return Object.assign({}, primer, lightTheme);
};
