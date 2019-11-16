import React from 'react';
import Account from "../../models/Account";

interface Props {
  activePage: string;
  activeSeason: number;
  activeAccountID: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
}

const LogMatchButton = ({ activePage, activeSeason, activeAccountID, onPageChange }: Props) => {
  if (activePage === 'log-match') {
    return null;
  }

  const changeToMatchFormPage = () => {
    const account = new Account({ _id: activeAccountID });
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
