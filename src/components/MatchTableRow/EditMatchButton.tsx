import styled from "styled-components";
import LinkButton from "../LinkButton";

export default styled(LinkButton)`
  color: ${props => props.theme.colors.gray[4]};

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.gray[9]};
  }
`;
