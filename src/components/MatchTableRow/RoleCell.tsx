import styled from "styled-components";
import MatchCell from "./MatchCell";

interface Props {
  isPlacement?: boolean;
  theme: string;
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

export default styled(MatchCell)<Props>`
  background-color: ${props => backgroundColor(props)};
  line-height: 1;
  vertical-align: middle;
`;
