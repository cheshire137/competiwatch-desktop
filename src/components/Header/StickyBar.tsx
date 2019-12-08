import styled from "styled-components";
import { Box } from "@primer/components";

interface Props {
  appTheme: string;
}

export default styled(Box).attrs({
  mb: 3
})<Props>`
  position: sticky;
  top: 0;
  z-index: 4;
  border-bottom: 1px solid ${props => props.appTheme === "dark" ? props.theme.colors.gray[8] : props.theme.colors.gray[2]};
  background-color: ${props => props.appTheme === "dark" ? "#24292e" : "#fff"};
`;
