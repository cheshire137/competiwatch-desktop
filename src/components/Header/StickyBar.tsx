import styled from "styled-components";
import { Box } from "@primer/react";

export default styled(Box).attrs({
  mb: 3
})`
  position: sticky;
  top: 0;
  z-index: 4;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.backgroundColor};
`;
