import styled from "styled-components";
import { Flex } from "@primer/components";

interface Props {
  appTheme: string;
}

const LayoutContainer = styled(Flex).attrs({
  flexDirection: "column"
})<Props>`
  min-height: 100vh;
  background-color: ${props =>
    props.appTheme === "dark" ? "#24292e" : "transparent"};
  color: ${props => (props.appTheme === "dark" ? "#e1e4e8" : "inherit")};
`;

export default LayoutContainer;
