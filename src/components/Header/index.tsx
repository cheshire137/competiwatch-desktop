import React from 'react'
import SeasonSelect from '../SeasonSelect'
import AccountSelect from '../AccountSelect'
import MainNavigation from '../MainNavigation';
import Account from "../../models/Account";
import './Header.css'

interface Props {
  activeSeason: number;
  latestSeason: number;
  onSeasonChange: () => {};
  accounts: Array<Account>;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
  activeAccountID: string;
  onAccountChange: () => {};
  activePage: string;
  onExport: () => {};
}

const Header = ({ activeSeason, latestSeason, onSeasonChange, accounts, onPageChange,
  activeAccountID, onAccountChange, activePage, onExport }: Props) => (
  <div className="mb-3 sticky-bar border-bottom">
    <div className="d-flex flex-items-center container">
      {accounts && accounts.length > 0 && (
        <SeasonSelect
          activeSeason={activeSeason}
          latestSeason={latestSeason}
          onChange={onSeasonChange}
          onPageChange={onPageChange}
        />
      )}
      {activeAccountID && (
        <AccountSelect
          accounts={accounts}
          activeAccountID={activeAccountID}
          onChange={onAccountChange}
          onPageChange={onPageChange}
        />
      )}
      <MainNavigation
        onPageChange={onPageChange}
        activePage={activePage}
        activeSeason={activeSeason}
        activeAccountID={activeAccountID}
        onExport={onExport}
      />
    </div>
  </div>
);

export default Header
