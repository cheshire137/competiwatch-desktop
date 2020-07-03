import React from "react";
import LayoutChildrenContainer from "./LayoutChildrenContainer";
import Blankslate from "./Blankslate";

const LoadingPage = () => (
  <LayoutChildrenContainer>
    <Blankslate>
      <h1>
        <span className="ion ion-md-refresh mr-3 ion-spin" />
        Loading...
      </h1>
    </Blankslate>
  </LayoutChildrenContainer>
);

export default LoadingPage;
