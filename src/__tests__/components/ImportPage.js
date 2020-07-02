import React from "react";
import { mount } from "enzyme";
import ImportPage from "../../components/ImportPage";

const account = {
  _id: "123",
  battletag: "MarchHare",
  totalMatches: () => 10
};

describe('ImportPage', () => {
  it("displays warning when account has matches in that season", async () => {
    const wrapper = await mount(<ImportPage theme="dark" account={account} seasonNumber="3" />);
    wrapper.update();
    const warnEl = wrapper.find(".flash-warn");
    expect(warnEl.text()).toMatch(
      /Importing matches will delete your 10 matches in season 3./
    );
  });
});
