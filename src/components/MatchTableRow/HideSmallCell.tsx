import styled from "styled-components";
import MatchCell, { Props } from "./MatchCell";

export default styled(MatchCell)<Props>`
  @media (max-width: 544px) {
    & {
      display: none !important;
    }
  }
`;
