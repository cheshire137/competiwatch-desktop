import React, { useState } from 'react';
import Match from '../../models/Match';

interface Props {
  activeAccountID: string;
  activeSeason: number;
  activePage: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const MatchesTab = ({ activePage, activeSeason, activeAccountID, onPageChange, underlineNavItemClass }: Props) => {
  const [totalMatches, setTotalMatches] = useState<number | null>(null);

  if (!activeAccountID) {
    return null;
  }

  Match.totalInSeason(activeSeason).then(total => {
    setTotalMatches(total);
  });

  const totalBadge = totalMatches !== null && (
    <span className="Counter">{totalMatches}</span>
  );

  if (activePage === 'matches') {
    return (
      <span className={underlineNavItemClass('matches', false)}>
        Matches {totalBadge}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={underlineNavItemClass('matches', true)}
      onClick={() => onPageChange('matches')}
    >Matches {totalBadge}</button>
  );
};

export default MatchesTab;
