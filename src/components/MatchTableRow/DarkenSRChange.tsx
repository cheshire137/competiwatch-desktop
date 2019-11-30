import styled from "styled-components";
import { MatchResult } from "../../models/Match";

interface Props {
  theme: string;
  result?: MatchResult;
}

function backgroundColor(props: Props) {
  if (props.theme !== "dark") {
    return "transparent";
  }
  if (props.result === "win") {
    return "rgba(35, 103, 0, 0.5)";
  }
  if (props.result === "loss") {
    return "rgba(175, 18, 27, 0.5)";
  }
  if (props.result === "draw") {
    return "#a88600";
  }
  return "transparent";
}

export default styled("span")<Props>`
  background-color: ${props => backgroundColor(props)};
  position: ${props => props.theme === "dark" ? "absolute" : "static"};
  left: ${props => props.theme === "dark" ? "0" : "auto"};
  top: ${props => props.theme === "dark" ? "0" : "auto"};
  width: ${props => props.theme === "dark" ? "100%" : "auto"};
  height: ${props => props.theme === "dark" ? "100%" : "auto"};
`;
