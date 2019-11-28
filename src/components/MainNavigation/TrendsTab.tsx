import React, { useState, useEffect } from "react";
import Account from "../../models/Account";

interface Props {
  activePage: string;
  activeAccount: Account;
  activeSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const TrendsTab = ({
  activePage,
  activeSeason,
  activeAccount,
  onPageChange,
  underlineNavItemClass
}: Props) => {
  const [hasMatches, setHasMatches] = useState(false);
  const account = new Account({ _id: activeAccount._id });

  useEffect(() => {
    async function getHasMatches() {
      const result = await account.hasMatches(activeSeason)
      setHasMatches(result);
    }

    getHasMatches();
  }, [account._id, activeSeason]);

  if (!hasMatches) {
    return null;
  }

  if (activePage === "trends") {
    return (
      <span className={underlineNavItemClass("trends", false)}>Trends</span>
    );
  }

  return (
    <button
      type="button"
      className={underlineNavItemClass("trends", true)}
      onClick={() => onPageChange("trends")}
    >
      Trends
    </button>
  );
};

export default TrendsTab;
