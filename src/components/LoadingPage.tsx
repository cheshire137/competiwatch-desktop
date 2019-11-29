import React from "react";
import LayoutChildrenContainer from "./LayoutChildrenContainer";

const LoadingPage = () => (
  <LayoutChildrenContainer>
    <div className="blankslate">
      <h1>
        <span className="ion ion-md-refresh mr-3 ion-spin" />
        Loading...
      </h1>
    </div>
  </LayoutChildrenContainer>
);

export default LoadingPage;
