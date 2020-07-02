import styled from "styled-components";
import LinkButton, { Props } from "../LinkButton";

export default styled(LinkButton)<Props>`
  visibility: hidden;
  color: ${props =>
    props.appTheme === "dark"
      ? props.theme.colors.gray[3]
      : props.theme.colors.gray[8]};
  font-size: 12px;
`;
