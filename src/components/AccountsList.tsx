import React from "react";
import AccountListItem from "./AccountListItem";
import Account from "../models/Account";
import Season from "../models/Season";

interface Props {
  accounts: Account[];
  season: Season;
  onAccountChange: (id: string) => void;
  onAccountUpdate: () => void;
  openQueue: boolean;
}

const AccountsList = ({
  onAccountChange,
  onAccountUpdate,
  season,
  accounts,
  openQueue
}: Props) => (
  <ul className="list-style-none mb-4">
    {accounts.map(account => (
      <AccountListItem
        key={account._id}
        season={season}
        account={account}
        openQueue={openQueue}
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
