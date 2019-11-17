import React from 'react';
import Account from "../../models/Account";

interface Props {
  activePage: string;
  activeSeason: number;
  activeAccount: Account;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const LogMatchButton = ({ activePage, activeSeason, activeAccount, onPageChange }: Props) => {
  if (activePage === 'log-match') {
    return null;
  }

  const changeToMatchFormPage = () => {
    const account = new Account({ _id: activeAccount._id });
    account.latestMatch(activeSeason).then(latestMatch => {
      if (latestMatch) {
        onPageChange('log-match', latestMatch.rank, latestMatch.group);
      } else {
        onPageChange('log-match');
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={changeToMatchFormPage}
    >Log a match</button>
  )
};

export default LogMatchButton;
