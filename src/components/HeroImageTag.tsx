import styled from 'styled-components';

interface Props {
  appTheme: string;
}

const HeroImageTag = styled("img")<Props>`
  background-color: ${props => props.appTheme === "dark" ? "#2f363d" : "inherit"};
`;

export default HeroImageTag;
