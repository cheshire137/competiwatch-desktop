import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";

interface Props {
  theme: string;
  isPlacement?: boolean;
}

function backgroundColor(props: Props) {
  if (props.isPlacement) {
    if (props.theme === "dark") {
      return "#3a434b";
    }
    return "#efefef";
  }
  return "transparent";
}

export default styled(HideSmallCell)<Props>`
  background-color: ${props => backgroundColor(props)};

  span + span {
    margin-left: 0.5em;
  }
`;
