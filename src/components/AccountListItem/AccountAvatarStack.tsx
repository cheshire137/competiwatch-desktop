import styled from "styled-components";
import { AvatarStack } from "@primer/react";
import HeroImageTag from "../HeroImageTag";

interface Props {
  threePlus: boolean;
}

const AccountAvatarStack = styled(AvatarStack).attrs({
  alignRight: true
})<Props>`
  height: 45px;
  ${props => (props.threePlus ? "min-width: 69px;" : "")}

  ${HeroImageTag} {
    width: 45px;
    height: 45px;
    background-color: transparent;
    margin-left: -25px;
    border-left: 0;
  }

  ${HeroImageTag} + ${HeroImageTag} {
    opacity: 0.5;
    width: 40px;
    height: 40px;

    + ${HeroImageTag} {
      opacity: 0.3;
      width: 35px;
      height: 35px;
    }
  }

  &:hover {
    ${HeroImageTag} {
      margin-left: -5px;
    }

    ${HeroImageTag} + ${HeroImageTag} {
      opacity: 1;
      width: 45px;
      height: 45px;
    }
  }
`;

export default AccountAvatarStack;
