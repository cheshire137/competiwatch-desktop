import React from 'react';

interface Props {
  activeAccountID: string;
  activePage: string;
  onPageChange: (event: any) => {};
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const MatchesButton = ({ activePage, activeAccountID, onPageChange, underlineNavItemClass }: Props) => {
  if (!activeAccountID) {
    return null;
  }

  if (activePage === 'matches') {
    return (
      <span className={underlineNavItemClass('matches', false)}>
        Matches
      </span>
    );
  }

  return (
    <button
      name="matches"
      type="button"
      className={underlineNavItemClass('matches', true)}
      onClick={onPageChange}
    >Matches</button>
  );
};

export default MatchesButton;
