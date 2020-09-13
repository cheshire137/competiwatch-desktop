import React from "react";
import AccountListItem from "./AccountListItem";
import Account from "../models/Account";
import Season from "../models/Season";

interface Props {
  accounts: Account[];
  season: Season;
  onAccountChange: (id: string) => void;
  onAccountUpdate: () => void;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const AccountsList = ({
  onAccountChange,
  onAccountUpdate,
  season,
  accounts,
  onPageChange
}: Props) => (
  <ul className="list-style-none mb-4">
    {accounts.map(account => (
      <AccountListItem
        key={account._id}
        season={season}
        account={account}
        onAccountChange={onAccountChange}
        onAccountUpdate={onAccountUpdate}
        onPageChange={onPageChange}
      />
    ))}
    {accounts.length < 1 && (
      <li className="text-gray text-italic">No accounts have been added.</li>
    )}
  </ul>
);

export default AccountsList;
