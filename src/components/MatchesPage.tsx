import React, { useState } from "react";
import MatchesList from "./MatchesList";
import LoadingPage from "./LoadingPage";
import Account from "../models/Account";

interface Props {
  account: Account;
  season: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  scrollToMatch: boolean;
  scrollToMatchID: string | null;
  theme: string;
}

const MatchesPage = ({
  account,
  onPageChange,
  season,
  scrollToMatch,
  scrollToMatchID,
  theme
}: Props) => {
  return (
    <div className="container layout-children-container">
      <MatchesList
        season={season}
        account={account}
        theme={theme}
        onPageChange={onPageChange}
        scrollToMatch={scrollToMatch}
        scrollToMatchID={scrollToMatchID}
      />
    </div>
  );
};

export default MatchesPage;
