import styled from "styled-components";
import { Text } from "@primer/react";

export default styled(Text).attrs({
  as: "div",
  ml: 2,
  fontSize: 1
})`
  color: ${props => props.theme.subtitleColor};
`;
