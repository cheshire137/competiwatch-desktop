import React from "react";
import ReactDOM from "react-dom";
import Season from "../../models/Season";
import SeasonSelect from "../../components/SeasonSelect";

it("renders", () => {
  const div = document.createElement("div");
  const activeSeason = new Season({ number: 10 });
  ReactDOM.render(<SeasonSelect activeSeason={activeSeason} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
