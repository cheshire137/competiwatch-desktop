import styled from "styled-components";
import { UnderlineNav } from "@primer/components";

interface Props {
  appTheme: string;
}

export default styled(UnderlineNav.Link).attrs({
  as: "button",
  type: "button"
})<Props>`
  color: ${props =>
    props.appTheme === "dark" ? "#fff" : props.theme.colors.gray[9]} !important;
  background-color: ${props =>
    props.appTheme === "dark" ? props.theme.colors.gray[9] : "#fff"};
  border-left: 0;
  border-right: 0;
  border-top: 0;
`;
