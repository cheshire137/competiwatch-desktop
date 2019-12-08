import React from "react";
import AccountsTab from "./AccountsTab";
import MatchesTab from "./MatchesTab";
import ImportTab from "./ImportTab";
import TrendsTab from "./TrendsTab";
import ExportButton from "./ExportButton";
import LogMatchButton from "./LogMatchButton";
import Account from "../../models/Account";
import { Flex } from "@primer/components";

interface Props {
  activePage: string;
  theme: string;
  activeAccount: Account | null;
  activeSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  onExport: () => void;
}

const MainNavigation = ({
  activeAccount,
  onPageChange,
  activeSeason,
  activePage,
  onExport,
  theme
}: Props) => (
  <Flex ml={3} width="100%" justifyContent="space-between" alignItems="center">
    <Flex>
      <AccountsTab
        theme={theme}
        onPageChange={onPageChange}
        activePage={activePage}
      />
      {activeAccount && (
        <MatchesTab
          theme={theme}
          onPageChange={onPageChange}
          activePage={activePage}
          activeSeason={activeSeason}
        />
      )}
      <ImportTab
        theme={theme}
        activePage={activePage}
      />
      {activeAccount && (
        <TrendsTab
          theme={theme}
          activePage={activePage}
          activeAccount={activeAccount}
          activeSeason={activeSeason}
          onPageChange={onPageChange}
        />
      )}
    </Flex>
    <div>
      <ExportButton onExport={onExport} activePage={activePage} />
      {activeAccount && (
        <LogMatchButton
          activePage={activePage}
          activeSeason={activeSeason}
          onPageChange={onPageChange}
          activeAccount={activeAccount}
        />
      )}
    </div>
    {activePage === "log-match" && (
      <div className="text-gray text-small">
        * All fields optional except match result
      </div>
    )}
  </Flex>
);

export default MainNavigation;
