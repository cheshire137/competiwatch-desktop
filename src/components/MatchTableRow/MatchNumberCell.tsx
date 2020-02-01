import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";

interface Props {
  isPlacement?: boolean;
  theme: string;
}

function backgroundColor(props: Props): string {
  if (props.isPlacement) {
    return props.theme === "dark" ? "#3a434b" : "#e8e8e8";
  }
  if (props.theme === "dark") {
    return "#444d56";
  }
  return "#d0cece";
}

export default styled(HideSmallCell)<Props>`
  background-color: ${props => backgroundColor(props)};
  color: ${props => props.theme === "dark" ? "#d1d5da" : "inherit"};
`;
