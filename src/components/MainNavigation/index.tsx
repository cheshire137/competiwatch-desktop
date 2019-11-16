import React from 'react'
import AccountsButton from './AccountsButton';
import MatchesButton from './MatchesButton';
import LogMatchButton from './LogMatchButton';
import EditMatchButton from './EditMatchButton';
import ImportButton from './ImportButton';
import TrendsButton from './TrendsButton';
import ExportButton from './ExportButton';

interface Props {
  activePage: string;
  activeAccountID: string;
  activeSeason: number;
  onPageChange: (event: any) => {};
  onExport: () => {};
}

const underlineNavItemClass = (page: string, isButton: boolean, activePage?: string): string => {
  const pageIsFirstInNav = page === 'accounts'
  const activePageIsNotInNav = pageIsFirstInNav && activePage === 'manage-seasons'
  const classes = ['UnderlineNav-item']

  if (activePage === page || activePageIsNotInNav) {
    classes.push('selected')
  }

  if (isButton) {
    classes.push('btn-link')
  }

  return classes.join(' ')
};

const MainNavigation = ({ activeAccountID, onPageChange, activeSeason, activePage, onExport }: Props) => (
  <nav className="ml-3 border-0 UnderlineNav width-full d-flex flex-justify-between flex-items-center">
    <div className="UnderlineNav-body">
      <AccountsButton
        onPageChange={onPageChange}
        activePage={activePage}
        underlineNavItemClass={underlineNavItemClass}
      />
      <MatchesButton
        activeAccountID={activeAccountID}
        onPageChange={onPageChange}
        activePage={activePage}
        activeSeason={activeSeason}
        underlineNavItemClass={underlineNavItemClass}
      />
      <LogMatchButton
        activePage={activePage}
        underlineNavItemClass={underlineNavItemClass}
      />
      <EditMatchButton
        activePage={activePage}
        underlineNavItemClass={underlineNavItemClass}
      />
      <ImportButton
        activePage={activePage}
        underlineNavItemClass={underlineNavItemClass}
      />
      <TrendsButton
        activePage={activePage}
        activeAccountID={activeAccountID}
        underlineNavItemClass={underlineNavItemClass}
        activeSeason={activeSeason}
        onPageChange={onPageChange}
      />
    </div>
    <ExportButton
      onExport={onExport}
      activePage={activePage}
    />
    {activePage === 'log-match' && (<div
      className="text-gray text-small"
    >* All fields optional except match result</div>)}
  </nav>
);

export default MainNavigation
