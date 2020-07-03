import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";
import { winColors, lossColors } from "./MatchCell";
import { MatchResult } from "../../models/Match";
import ColorGradient from "../../models/ColorGradient";

interface Props {
  isPlacement?: boolean;
  result?: MatchResult;
  winStreak?: number;
  lossStreak?: number;
  longestWinStreak: number;
  longestLossStreak: number;
}

function backgroundColor(props: Props) {
  let colors: number[][] = [];
  let stepCount = 0;
  const streakList = [];
  let streak: number | undefined = 0;

  if (props.result === "win") {
    colors = winColors;
    stepCount = props.longestWinStreak;
    streak = props.winStreak;
  } else if (props.result === "loss") {
    colors = lossColors;
    stepCount = props.longestLossStreak;
    streak = props.lossStreak;
  }

  if (colors.length > 0) {
    for (let i = 1; i <= stepCount; i++) {
      streakList.push(i);
    }
    const gradient = new ColorGradient(colors, stepCount);
    const rgbColors = gradient.rgb();
    const index = typeof streak === "number" ? streakList.indexOf(streak) : -1;
    const color = rgbColors[index];
    return `rgb(${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(
      color[2]
    )})`;
  }
}

export default styled(HideSmallCell)<Props>`
  position: relative;
  background-color: ${props =>
    props.result === "draw"
      ? props.theme.drawBackgroundColor
      : backgroundColor(props) ||
        (props.isPlacement
          ? props.theme.placementMatchCellBackgroundColor
          : "transparent")};
`;
