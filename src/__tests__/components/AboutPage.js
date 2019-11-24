import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

global.window.remote = {
  app: {
    getName: () => "Sample App"
  }
};
jest.mock("is-electron", () => ({
  __esModule: true,
  default: () => true
}));
import AboutPage from "../../components/AboutPage";

it("matches snapshot", () => {
  const tree = renderer.create(<AboutPage />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("displays app name", () => {
  const div = document.createElement("div");
  const wrapper = shallow(<AboutPage />);
  const header = wrapper.find("h1");
  expect(header.text()).toBe("About Sample App");
});
