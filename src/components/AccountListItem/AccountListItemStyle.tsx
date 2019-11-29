import styled from "styled-components";
import { Box } from "@primer/components";
import ButtonShownOnHover from "./ButtonShownOnHover";

export default styled(Box).attrs({
  as: "li",
  p: 3,
  mb: 3
})`
  &:hover ${ButtonShownOnHover} {
    visibility: visible;
  }
`;
