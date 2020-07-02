import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

const accounts = [
  { _id: "456", battletag: "CheshireCat" },
  { _id: "123", battletag: "MarchHare" }
];

global.window.ipcRenderer = {
  once: (_, handler) => {
    handler(null, null, { _id: "123", battletag: "MarchHare" });
  },
  send: () => null
};
jest.mock("is-electron", () => ({
  __esModule: true,
  default: () => true
}));
import AccountSelect from "../../components/AccountSelect";

it("matches snapshot", () => {
  const tree = renderer
    .create(<AccountSelect accounts={accounts} activeAccountID="123" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders", async () => {
  const wrapper = shallow(
    <AccountSelect accounts={accounts} activeAccountID="123" />
  );
  const button = wrapper.find(".select-menu-button");
  expect(button.text()).toBe("Select an account");
});
