import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";
import { winColors, lossColors } from "./MatchCell";
import { MatchResult } from "../../models/Match";
import ColorGradient from "../../models/ColorGradient";

interface Props {
  isPlacement?: boolean;
  theme: string;
  result?: MatchResult;
  winStreak?: number;
  lossStreak?: number;
  longestWinStreak: number;
  longestLossStreak: number;
}

function backgroundColor(props: Props) {
  if (props.result === "draw") {
    if (props.theme === "dark") {
      return "#a88600";
    }
    return "#ddd";
  }

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
    const index =
      typeof streak === "number" ? streakList.indexOf(streak) : -1;
    const color = rgbColors[index];
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  if (props.isPlacement) {
    if (props.theme === "dark") {
      return "#3a434b";
    }
    return "#efefef";
  }

  return "transparent";
}

export default styled(HideSmallCell)<Props>`
  position: relative;
  background-color: ${props => backgroundColor(props)};
`;
