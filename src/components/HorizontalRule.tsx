import styled from "styled-components";

export default styled("hr").attrs({
  mb: 5,
  pt: 5
})`
  border-bottom-color: ${props => props.theme.borderColor} !important;
`;
