import styled from "styled-components";

export interface Props {
  appTheme: string;
  noWrap?: boolean;
  hideSmall?: boolean;
}

const MatchHeader = styled("th")<Props>`
  border: 1px solid ${props => (props.appTheme === "dark" ? "#2f363d" : "#000")};
  background-color: ${props =>
    props.appTheme === "dark" ? "#212b49" : "#bed6ed"};
  padding: 0.3em 0.6em;
  ${props => (props.noWrap ? "white-space: nowrap !important;" : "")}
  @media (max-width: 544px) {
    .hide-sm {
      display: ${props => (props.hideSmall ? "none !important" : "table-cell")};
    }
  }
`;

export default MatchHeader;
