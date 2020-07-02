import styled from "styled-components";
import { Flex } from "@primer/components";

interface Props {
  appTheme: string;
}

const LayoutContainer = styled(Flex).attrs({
  flexDirection: "column"
})<Props>`
  min-height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};
`;

export default LayoutContainer;
