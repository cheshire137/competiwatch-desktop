import styled from "styled-components";
import MatchHeader, { Props } from "./MatchHeader";

const OptionsHeader = styled(MatchHeader)<Props>`
  border: none;
  background-color: transparent;
  padding: 0.4em 0 0 7px;
  display: block;
  margin-right: -18px;
  visibility: hidden;
`;

export default OptionsHeader;
