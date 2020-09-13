import styled from "styled-components";
import { UnderlineNav } from "@primer/components";

export default styled(UnderlineNav.Link).attrs({
  as: "button",
  type: "button"
})`
  color: ${props => props.theme.headerLinkColor} !important;
  background-color: ${props => props.theme.headerLinkBackgroundColor};
  border-left: 0;
  border-right: 0;
  border-top: 0;
`;
