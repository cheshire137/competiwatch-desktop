import React from "react";
import AccountListItem from "./AccountListItem";
import Account from "../models/Account";

interface Props {
  accounts: Account[];
  season: number;
  onAccountChange: (id: string) => void;
  onAccountUpdate: () => void;
  theme: string;
}

const AccountsList = ({
  onAccountChange,
  onAccountUpdate,
  season,
  accounts,
  theme
}: Props) => (
  <ul className="list-style-none mb-4">
    {accounts.map(account => (
      <AccountListItem
        key={account._id}
        season={season}
        theme={theme}
        account={account}
        onAccountChange={onAccountChange}
        onAccountUpdate={onAccountUpdate}
      />
    ))}
    {accounts.length < 1 && (
      <li className="text-gray text-italic">No accounts have been added.</li>
    )}
  </ul>
);

export default AccountsList;
