import styled from "styled-components";

export default styled.button.attrs({
  type: "submit"
})`
  display: inline-block;
  color: ${props => props.theme.colors.red[5]};
  font-size: 12px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 0;
  background-image: none;
  font-weight: normal;
  appearance: none;
  box-shadow: none;

  &:hover,
  &:focus {
    background-image: none;
    background-color: transparent;
    text-decoration: underline;
    box-shadow: none;
  }
`;
