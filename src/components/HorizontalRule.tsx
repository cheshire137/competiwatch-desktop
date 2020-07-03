import styled from "styled-components";

export default styled("hr").attrs({
  mb: 4,
  pt: 4
})`
  border-bottom-color: ${props => props.theme.borderColor} !important;
`;
