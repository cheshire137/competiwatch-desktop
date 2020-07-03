import { colors } from "@primer/primitives";

const darkTheme = {
  backgroundColor: "#24292e",
  color: "#e1e4e8",
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
  matchCellBackgroundColor: "#444d56",
  matchCellColor: "#d1d5da",
  accountMetaColor: "#d1d5da",
  heroImageBackgroundColor: "#2f363d !important",
  mapBackgroundColors: {
    Junkertown: "#b57e0a",
    Hanamura: "#86385c",
    "Temple of Anubis": "#a76c40",
    "Volskaya Industries": "#7063b7",
    Dorado: "#a15e31",
    "Route 66": "#994e49",
    "Watchpoint: Gibraltar": "#58423f",
    Eichenwalde: "#546857",
    Busan: "#d56c43",
    "Blizzard World": "#0471bb",
    Havana: "#44867b",
    Hollywood: "#c68664",
    "King's Row": "#425a5c",
    Numbani: "#566036",
    Paris: "#7c6785",
    Ilios: "#788bce",
    "Lijiang Tower": "#b55f4e",
    Nepal: "#5a7cc6",
    Oasis: "#b37061",
    "Horizon Lunar Colony": "#3d3939",
    Rialto: "#789c86"
  },
  darkenSRChange: {
    backgroundColor: {
      win: "rgba(35, 103, 0, 0.5)",
      loss: "rgba(175, 18, 27, 0.5)",
      draw: "#a88600"
    },
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  },
  drawBackgroundColor: "#a88600"
};

export default darkTheme;
