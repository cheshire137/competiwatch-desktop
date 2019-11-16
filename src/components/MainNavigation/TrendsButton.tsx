import React, { useState } from 'react';
import Account from '../../models/Account'

interface Props {
  activePage: string;
  activeAccountID: string;
  activeSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const TrendsButton = ({ activePage, activeSeason, activeAccountID, onPageChange, underlineNavItemClass }: Props) => {
  const [hasMatches, setHasMatches] = useState(false);
  const account = new Account({ _id: activeAccountID });
  account.hasMatches(activeSeason).then(hasMatches => {
    setHasMatches(hasMatches);
  });

  if (!hasMatches || !activeAccountID) {
    return null;
  }

  if (activePage === 'trends') {
    return (
      <span className={underlineNavItemClass('trends', false)}>
        Trends
      </span>
    );
  }

  return (
    <button
      type="button"
      className={underlineNavItemClass('trends', true)}
      onClick={() => onPageChange('trends')}
    >Trends</button>
  )
};

export default TrendsButton;
