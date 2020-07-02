import React from "react";
import SeasonSelect from "../SeasonSelect";
import AccountSelect from "../AccountSelect";
import MainNavigation from "../MainNavigation";
import Account from "../../models/Account";
import StickyBar from "./StickyBar";

interface Props {
  activeSeason: number;
  theme: string;
  latestSeason: number;
  onSeasonChange: (newNumber: number) => void;
  accounts: Array<Account>;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  activeAccount: Account | null;
  onAccountChange: (id: string) => void;
  activePage: string;
  onExport: () => void;
}

const Header = ({
  activeSeason,
  latestSeason,
  onSeasonChange,
  accounts,
  onPageChange,
  activeAccount,
  onAccountChange,
  activePage,
  onExport,
  theme
}: Props) => (
  <StickyBar>
    <div className="d-flex flex-items-center container">
      {accounts && accounts.length > 0 && (
        <SeasonSelect
          activeSeason={activeSeason}
          latestSeason={latestSeason}
          onSeasonChange={onSeasonChange}
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
        theme={theme}
      />
    </div>
  </StickyBar>
);

export default Header;
