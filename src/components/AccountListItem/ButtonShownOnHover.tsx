import styled from "styled-components";
import LinkButton from "../LinkButton";

export default styled(LinkButton)`
  visibility: hidden;
  color: ${props => props.theme.buttonShownOnHoverColor};
  font-size: 12px;
`;
