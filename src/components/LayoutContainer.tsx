import styled from "styled-components";
import { Flex } from "@primer/components";

const LayoutContainer = styled(Flex).attrs({
  flexDirection: "column"
})`
  min-height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
`;

export default LayoutContainer;
