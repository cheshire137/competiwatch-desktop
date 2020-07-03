import React from "react";
import renderer from "react-test-renderer";
import LoadingPage from "../../components/LoadingPage";

it("matches snapshot", () => {
  const tree = renderer.create(<LoadingPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
