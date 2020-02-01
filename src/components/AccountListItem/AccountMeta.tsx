import styled from 'styled-components';
import { Flex } from "@primer/components";

interface Props {
  appTheme: string;
}

const AccountMeta = styled(Flex).attrs({
  alignItems: "center"
})<Props>`
  font-size: 16px;
  color: ${props => props.appTheme === "dark" ? "#d1d5da" : "#586069"} !important;
`;

export default AccountMeta;
