import styled from "styled-components";
import { Box } from "@primer/react";

const AccountMeta = styled(Box).attrs({
  alignItems: "center",
  display: "flex"
})`
  font-size: 16px;
  color: ${props => props.theme.accountMetaColor} !important;
`;

export default AccountMeta;
