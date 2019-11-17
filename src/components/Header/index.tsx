import React from 'react'
import SeasonSelect from '../SeasonSelect'
import AccountSelect from '../AccountSelect'
import MainNavigation from '../MainNavigation';
import Account from "../../models/Account";
import './Header.css'

interface Props {
  activeSeason: number;
  latestSeason: number;
  onSeasonChange: (newNumber: number) => void;
  accounts: Array<Account>;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  activeAccount: Account | null;
  onAccountChange: (id: string) => void;
  activePage: string;
  onExport: () => void;
}

const Header = ({ activeSeason, latestSeason, onSeasonChange, accounts, onPageChange,
  activeAccount, onAccountChange, activePage, onExport }: Props) => (
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
      {activeAccount && (
        <AccountSelect
          accounts={accounts}
          activeAccount={activeAccount}
          onChange={onAccountChange}
          onPageChange={onPageChange}
        />
      )}
      <MainNavigation
        onPageChange={onPageChange}
        activePage={activePage}
        activeSeason={activeSeason}
        activeAccount={activeAccount}
        onExport={onExport}
      />
    </div>
  </div>
);

export default Header
