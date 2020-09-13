import React from "react";
import Account from "../../models/Account";
import Season from "../../models/Season";

interface Props {
  activePage: string;
  activeSeason: Season;
  activeAccount: Account;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  openQueue: boolean;
}

const LogMatchButton = ({
  activePage,
  activeSeason,
  activeAccount,
  onPageChange,
  openQueue
}: Props) => {
  if (activePage === "log-match" || activePage === "edit-match") {
    return null;
  }

  const changeToMatchFormPage = async () => {
    const account = new Account({ _id: activeAccount._id });
    const latestMatch = await account.latestMatch(activeSeason, openQueue);

    if (latestMatch) {
      onPageChange("log-match", latestMatch.rank, latestMatch.group);
    } else {
      onPageChange("log-match");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => changeToMatchFormPage()}
    >
      Log a match
    </button>
  );
};

export default LogMatchButton;
