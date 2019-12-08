import styled from "styled-components";
import LinkButton from "../LinkButton";

export default styled(LinkButton).attrs({
  type: "submit"
})`
  color: ${props => props.theme.colors.red[5]};
  font-size: 12px;
`;
