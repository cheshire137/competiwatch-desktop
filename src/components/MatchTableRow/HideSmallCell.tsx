import styled from "styled-components";
import MatchCell from "./MatchCell";

export default styled(MatchCell)`
  @media (max-width: 544px) {
    & {
      display:none !important;
    }
  }
`;
