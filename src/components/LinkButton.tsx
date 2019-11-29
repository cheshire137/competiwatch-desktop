import styled from "styled-components";

export default styled("button")`
  display: inline-block;
  padding: 0;
  color: ${props => props.theme.colors.blue[5]};
  font-size: inherit;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 0;
  appearance: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
