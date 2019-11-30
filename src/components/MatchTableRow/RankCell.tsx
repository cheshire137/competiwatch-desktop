import styled from "styled-components";
import MatchCell from "./MatchCell";

interface Props {
  isPlacement?: boolean;
  theme: string;
  betterThanPlacement?: boolean;
}

function backgroundColor(props: Props) {
  if (props.isPlacement) {
    if (props.theme === "dark") {
      return "#3a434b";
    }
    return "#efefef";
  }

  if (typeof props.betterThanPlacement !== "boolean") {
    return "transparent";
  }

  if (props.theme === "dark") {
    if (props.betterThanPlacement) {
      return "#69a32a";
    }
    return "#af121b"; // worse than placement
  }

  if (props.betterThanPlacement) {
    return "#a9cf90";
  }
  return "#fc0d1b"; // worse than placement
}

function color(props: Props) {
  if (typeof props.betterThanPlacement !== "boolean") {
    return "inherit";
  }

  if (props.theme === "dark") {
    if (props.betterThanPlacement) {
      return "#f8f9f7";
    }
    return "#f9e3e4";
  }

  return "inherit";
}

export default styled(MatchCell)<Props>`
  background-color: ${props => backgroundColor(props)};
  color: ${props => color(props)};
`;
