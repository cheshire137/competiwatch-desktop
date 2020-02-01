import styled from "styled-components";

interface Props {
  appTheme: string;
}

export default styled("div")<Props>`
  position: relative;
  padding: 32px;
  text-align: center;
  background-color: ${props => props.appTheme === "dark" ? "#494949" : "#fafbfc"};
  border: 1px solid ${props => props.appTheme === "dark" ? "#2f363d" : "#e1e4e8"};
  border-radius: 3px;
  box-shadow: inset 0 0 10px rgba(27,31,35,0.05)
`;
