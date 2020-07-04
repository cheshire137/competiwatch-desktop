import styled from "styled-components";
import { Text } from "@primer/components";

export default styled(Text).attrs({
  as: "div",
  ml: 2,
  fontSize: 1
})`
  color: ${props => props.theme.subtitleColor};
`;
