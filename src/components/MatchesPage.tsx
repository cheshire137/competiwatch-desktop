import React, { useState } from 'react'
import MatchesList from './MatchesList'
import LoadingPage from './LoadingPage'
import Account from '../models/Account'

interface Props {
  accountID: string;
  season: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
  scrollToMatch: boolean;
  scrollToMatchID?: string;
  theme: string;
}

const MatchesPage = ({ accountID, onPageChange, season, scrollToMatch, scrollToMatchID, theme }: Props) => {
  const [account, setAccount] = useState<Account | null>(null);
  Account.find(accountID).then(a => setAccount(a));

  if (!account) {
    return <LoadingPage />;
  }

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

export default MatchesPage
