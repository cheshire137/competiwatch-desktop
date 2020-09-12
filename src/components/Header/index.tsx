import React from "react";
import SeasonSelect from "../SeasonSelect";
import AccountSelect from "../AccountSelect";
import MainNavigation from "../MainNavigation";
import Account from "../../models/Account";
import Season from "../../models/Season";
import StickyBar from "./StickyBar";

interface Props {
  activeSeason: Season;
  seasons: Season[];
  onSeasonChange: (newNumber: Season) => void;
  accounts: Array<Account>;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  activeAccount: Account | null;
  onAccountChange: (id: string) => void;
  activePage: string;
  onExport: () => void;
  openQueue: boolean;
  onOpenQueueChange: (newValue: boolean) => void;
}

const Header = ({
  activeSeason,
  onSeasonChange,
  accounts,
  seasons,
  onPageChange,
  activeAccount,
  onAccountChange,
  activePage,
  onExport,
  openQueue,
  onOpenQueueChange
}: Props) => (
  <StickyBar>
    <div className="d-flex flex-items-center container">
      {accounts && accounts.length > 0 && (
        <SeasonSelect
          activeSeason={activeSeason}
          onSeasonChange={onSeasonChange}
          seasons={seasons}
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
        openQueue={openQueue}
        onOpenQueueChange={onOpenQueueChange}
      />
    </div>
  </StickyBar>
);

export default Header;
