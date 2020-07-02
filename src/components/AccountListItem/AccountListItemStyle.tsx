import styled from "styled-components";
import { Box } from "@primer/components";
import ButtonShownOnHover from "./ButtonShownOnHover";

interface Props {
  appTheme: string;
}

export default styled(Box).attrs({
  as: "li",
  p: 3
})<Props>`
  & + & {
    border-top: 1px solid
      ${props =>
        props.appTheme === "dark"
          ? props.theme.colors.gray[7]
          : props.theme.colors.gray[3]};
  }

  &:hover ${ButtonShownOnHover} {
    visibility: visible;
  }
`;
