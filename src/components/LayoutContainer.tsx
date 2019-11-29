import styled from 'styled-components';

interface Props {
  theme: string;
}

const LayoutContainer = styled.div<Props>`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: ${props => props.theme === "dark" ? "#24292e" : "transparent"};
  color: ${props => props.theme === "dark" ? "#e1e4e8" : "inherit"};
`;

export default LayoutContainer;
