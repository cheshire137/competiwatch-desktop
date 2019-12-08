import styled from "styled-components";
import { Button } from "@primer/components";

interface Props {
  appTheme: string;
}

export default styled(Button).attrs({
  p: 0,
  type: "button"
}) <Props>`
  display: inline-block;
  color: ${props => props.appTheme === "dark" ? props.theme.colors.blue[3] : props.theme.colors.blue[5]};
  font-size: inherit;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 0;
  background-image: none;
  font-weight: normal;
  appearance: none;

  &:hover,
  &:focus {
    background-image: none;
    background-color: transparent;
    text-decoration: underline;
  }
`;
