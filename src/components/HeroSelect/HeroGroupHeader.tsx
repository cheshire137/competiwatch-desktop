import styled from "styled-components";
import { Heading } from "@primer/components";

interface Props {
  roleUnavailable?: boolean;
}

export default styled(Heading).attrs({
  pb: 1,
  mb: 2,
  fontSize: 1
})<Props>`
  border-bottom: 1px solid ${props => props.theme.borderColor};
  opacity: ${props => props.roleUnavailable ? 0.7 : 1};
`;
