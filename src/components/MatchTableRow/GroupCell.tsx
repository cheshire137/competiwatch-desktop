import styled from "styled-components";
import HideSmallCell from "./HideSmallCell";
import { Props } from "./MatchCell";

export default styled(HideSmallCell)<Props>`
  span + span {
    margin-left: 0.5em;
  }
`;
