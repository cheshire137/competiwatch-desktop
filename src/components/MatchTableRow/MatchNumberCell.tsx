import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";

interface Props {
  isPlacement?: boolean;
}

export default styled(HideSmallCell)<Props>`
  background-color: ${props => props.isPlacement ? props.theme.placementMatchCellBackgroundColor : props.theme.matchCellBackgroundColor};
  color: ${props => props.theme.matchCellColor};
`;
