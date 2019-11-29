import styled from 'styled-components';
import { Flex } from "@primer/components";

interface Props {
  theme: string;
}

const LayoutContainer = styled(Flex).attrs({
  flexDirection: "column"
})<Props>`
  min-height: 100vh;
  background-color: ${props => props.theme === "dark" ? "#24292e" : "transparent"};
  color: ${props => props.theme === "dark" ? "#e1e4e8" : "inherit"};
`;

export default LayoutContainer;
