import styled from "styled-components";

interface Props {
  appTheme: string;
}

export default styled("hr").attrs({
  mb: 4,
  pt: 4
}) <Props>`
  border-bottom-color: ${props =>
    props.appTheme === "dark" ? props.theme.colors.gray[7] : props.theme.colors.gray[2]} !important;
`;
