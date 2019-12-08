import React, { useState, useEffect } from "react";
import Account from "../../models/Account";
import Tab from "./Tab";

interface Props {
  theme: string;
  activePage: string;
  activeAccount: Account;
  activeSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const TrendsTab = ({
  activePage,
  activeSeason,
  activeAccount,
  onPageChange,
  theme
}: Props) => {
  const [hasMatches, setHasMatches] = useState(false);
  const account = new Account({ _id: activeAccount._id });

  useEffect(() => {
    async function getHasMatches() {
      const result = await account.hasMatches(activeSeason)
      setHasMatches(result);
    }

    getHasMatches();
  }, [account, account._id, activeSeason]);

  if (!hasMatches) {
    return null;
  }

  return (
    <Tab
      appTheme={theme}
      selected={activePage === "trends"}
      onClick={() => onPageChange("trends")}
    >
      Trends
    </Tab>
  );
};

export default TrendsTab;
