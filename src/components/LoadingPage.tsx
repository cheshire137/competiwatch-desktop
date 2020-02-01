import React from "react";
import LayoutChildrenContainer from "./LayoutChildrenContainer";
import Blankslate from "./Blankslate";

interface Props {
  theme: string;
}

const LoadingPage = ({ theme }: Props) => (
  <LayoutChildrenContainer>
    <Blankslate appTheme={theme}>
      <h1>
        <span className="ion ion-md-refresh mr-3 ion-spin" />
        Loading...
      </h1>
    </Blankslate>
  </LayoutChildrenContainer>
);

export default LoadingPage;
