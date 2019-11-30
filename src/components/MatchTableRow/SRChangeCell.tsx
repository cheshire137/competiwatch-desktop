import styled from "styled-components";
import MatchCell, { winColors, neutralColor, lossColors } from "./MatchCell";
import { MatchResult } from "../../models/Match";
import ColorGradient from "../../models/ColorGradient";

interface Props {
  result?: MatchResult;
  isPlacement?: boolean;
  rankChange?: number;
  theme: string;
  rankChanges: number[];
}

function backgroundColor(props: Props) {
  if (props.isPlacement) {
    if (props.theme === "dark") {
      return "#3a434b";
    }
    return "#efefef";
  }

  let color: number[] = [];

  if (props.result === "draw") {
    color = neutralColor;
  } else {
    const colorRange = props.result === "win" ? winColors : lossColors;
    const gradient = new ColorGradient(colorRange, props.rankChanges.length);
    const rgbColors = gradient.rgb();
    const index =
      typeof props.rankChange === "number"
        ? props.rankChanges.indexOf(props.rankChange)
        : -1;

    if (typeof index === "number") {
      color = rgbColors[index];
    }
  }

  if (color.length > 0) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  return "transparent";
}

export default styled(MatchCell)<Props>`
  position: relative;
  background-color: ${props => backgroundColor(props)};
`;
