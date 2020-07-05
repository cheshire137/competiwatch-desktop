import styled from "styled-components";
import { Text } from "@primer/components";

export default styled(Text).attrs({
  as: "p",
  mt: 2,
  fontSize: 0
})`
  color: ${props => props.theme.subtitleColor};
`;
