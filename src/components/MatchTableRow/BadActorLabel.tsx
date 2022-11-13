import styled from "styled-components";
import { CounterLabel } from "@primer/react";

export default styled(CounterLabel)`
  background-color: ${props => props.theme.colors.red[5]};
  color: white;
`;
