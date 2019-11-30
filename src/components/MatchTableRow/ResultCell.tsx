import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";
import { MatchResult } from "../../models/Match";

interface Props {
  result?: MatchResult;
  theme: string;
}

function backgroundColor(props: Props) {
  if (props.theme === "dark") {
    if (props.result === "win") {
      return "#69a32a";
    }
    if (props.result === "draw") {
      return "#a88600";
    }
    if (props.result === "loss") {
      return "#af121b";
    }
  }
  if (props.result === "win") {
    return "#a9cf90";
  }
  if (props.result === "draw") {
    return "#fed86e";
  }
  if (props.result === "loss") {
    return "#fc0d1b";
  }
  return "transparent";
}

function color(props: Props) {
  if (props.theme === "dark") {
    if (props.result === "win") {
      return "#f8f9f7";
    }
    if (props.result === "loss") {
      return "#f9e3e4";
    }
  }
  return "inherit";
}

export default styled(HideSmallCell)<Props>`
  background-color: ${props => backgroundColor(props)};
  color: ${props => color(props)};
`;
