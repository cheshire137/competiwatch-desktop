import styled from "styled-components";

export interface Props {
  noWrap?: boolean;
  hideSmall?: boolean;
}

const MatchHeader = styled("th")<Props>`
  border: 1px solid ${props => props.theme.headerBorderColor};
  background-color: ${props => props.theme.headerBackgroundColor};
  padding: 0.3em 0.6em;
  ${props => (props.noWrap ? "white-space: nowrap !important;" : "")}
  @media (max-width: 544px) {
    .hide-sm {
      display: ${props => (props.hideSmall ? "none !important" : "table-cell")};
    }
  }
`;

export default MatchHeader;
