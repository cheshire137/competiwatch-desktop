import React, { useState } from "react";
import MatchesList from "./MatchesList";
import Account from "../models/Account";
import LayoutChildrenContainer from "./LayoutChildrenContainer";

interface Props {
  account: Account;
  season: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  scrollToMatchID: string | null;
  theme: string;
}

const MatchesPage = ({
  account,
  onPageChange,
  season,
  scrollToMatchID,
  theme
}: Props) => (
  <LayoutChildrenContainer>
    <MatchesList
      season={season}
      account={account}
      theme={theme}
      onPageChange={onPageChange}
      scrollToMatchID={scrollToMatchID}
    />
  </LayoutChildrenContainer>
);

export default MatchesPage;
