import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";

interface Props {
  isPlacement?: boolean;
}

export default styled(HideSmallCell)<Props>`
  background-color: ${props => props.isPlacement ? "#e8e8e8" : "#d0cece"};
`;
