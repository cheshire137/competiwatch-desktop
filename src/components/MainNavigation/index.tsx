import React from 'react'
import AccountsTab from './AccountsTab';
import MatchesTab from './MatchesTab';
import EditMatchButton from './EditMatchButton';
import ImportButton from './ImportButton';
import TrendsTab from './TrendsTab';
import ExportButton from './ExportButton';
import LogMatchButton from './LogMatchButton';

interface Props {
  activePage: string;
  activeAccountID: string;
  activeSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
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
      <AccountsTab
        onPageChange={onPageChange}
        activePage={activePage}
        underlineNavItemClass={underlineNavItemClass}
      />
      <MatchesTab
        activeAccountID={activeAccountID}
        onPageChange={onPageChange}
        activePage={activePage}
        activeSeason={activeSeason}
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
      <TrendsTab
        activePage={activePage}
        activeAccountID={activeAccountID}
        underlineNavItemClass={underlineNavItemClass}
        activeSeason={activeSeason}
        onPageChange={onPageChange}
      />
    </div>
    <div>
      <ExportButton
        onExport={onExport}
        activePage={activePage}
      />
      <LogMatchButton
        activePage={activePage}
        activeSeason={activeSeason}
        onPageChange={onPageChange}
        activeAccountID={activeAccountID}
      />
    </div>
    {activePage === 'log-match' && (<div
      className="text-gray text-small"
    >* All fields optional except match result</div>)}
  </nav>
);

export default MainNavigation
