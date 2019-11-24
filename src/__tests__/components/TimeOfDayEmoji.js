import React from "react";
import ReactDOM from "react-dom";
import TimeOfDayEmoji from "../../components/TimeOfDayEmoji";

it("renders", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TimeOfDayEmoji timeOfDay="morning" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
