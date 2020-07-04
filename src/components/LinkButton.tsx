import styled from "styled-components";
import { Button } from "@primer/components";

export default styled(Button).attrs({
  p: 0,
  type: "button"
})`
  color: ${props => props.theme.linkColor};
  font-size: inherit;
  background-color: transparent;
  border: 0;
  background-image: none;
  font-weight: normal;
  box-shadow: none;
  vertical-align: baseline;

  &:hover,
  &:focus {
    background-image: none;
    background-color: transparent;
    text-decoration: underline;
    box-shadow: none;
  }
`;
