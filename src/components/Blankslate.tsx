import styled from "styled-components";

export default styled("div")`
  position: relative;
  padding: 32px;
  text-align: center;
  background-color: ${props => props.theme.blankslateBackgroundColor};
  border: 1px solid ${props => props.theme.blankslateBorderColor};
  border-radius: 3px;
  box-shadow: inset 0 0 10px rgba(27, 31, 35, 0.05);
`;
