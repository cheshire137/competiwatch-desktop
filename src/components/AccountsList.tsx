import React from 'react';
import AccountListItem from './AccountListItem';
import Account from '../models/Account'

interface Props {
  accounts: Account[];
  season: number;
  onAccountChange: (id: string) => void;
  onAccountUpdate: () => void;
}

const AccountsList = ({ onAccountChange, onAccountUpdate, season, accounts }: Props) => (
  <ul className="list-style-none mb-4">
    {accounts.map(account => (
      <AccountListItem
        key={account._id}
        season={season}
        account={account}
        onAccountChange={onAccountChange}
        onAccountUpdate={onAccountUpdate}
      />
    ))}
    {accounts.length < 1 && (
      <li className="text-gray text-italic">
        No accounts have been added.
      </li>
    )}
  </ul>
);

export default AccountsList;
