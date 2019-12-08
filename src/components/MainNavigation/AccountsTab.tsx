import React from "react";
import Tab from "./Tab";

interface Props {
  activePage: string;
  theme: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const AccountsTab = ({
  activePage,
  onPageChange,
  theme
}: Props) => {
  return (
    <Tab
      appTheme={theme}
      selected={activePage === "accounts"}
      onClick={() => onPageChange("accounts")}
    >
      Accounts
    </Tab>
  );
};

export default AccountsTab;
