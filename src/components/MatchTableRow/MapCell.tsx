import styled from "styled-components";
import MatchCell, { Props as MatchCellProps } from "./MatchCell";
import { Map } from "../../models/Map";

interface Props extends MatchCellProps {
  map?: Map;
}

export default styled(MatchCell)<Props>`
  background-color: ${props =>
    props.map ? props.theme.mapBackgroundColors[props.map] : "transparent"};
`;
