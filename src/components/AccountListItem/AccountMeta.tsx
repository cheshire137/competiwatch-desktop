import styled from "styled-components";
import { Flex } from "@primer/components";

const AccountMeta = styled(Flex).attrs({
  alignItems: "center"
})`
  font-size: 16px;
  color: ${props => props.theme.accountMetaColor} !important;
`;

export default AccountMeta;
