import styled from "styled-components";
import LinkButton from "../LinkButton";

export default styled(LinkButton)`
  visibility: hidden;
  color: ${props => props.theme.colors.gray[8]};
  font-size: 12px;
`;
