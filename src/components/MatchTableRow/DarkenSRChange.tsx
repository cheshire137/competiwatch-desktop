import styled from "styled-components";
import { MatchResult } from "../../models/Match";

interface Props {
  result?: MatchResult;
}

export default styled("span")<Props>`
  background-color: ${props =>
    props.theme.darkenSRChange.backgroundColor[props.result]};
  position: ${props => props.theme.darkenSRChange.position};
  left: ${props => props.theme.darkenSRChange.left};
  top: ${props => props.theme.darkenSRChange.top};
  width: ${props => props.theme.darkenSRChange.width};
  height: ${props => props.theme.darkenSRChange.height};
`;
