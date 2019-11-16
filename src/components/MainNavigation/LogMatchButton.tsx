import React from 'react';

interface Props {
  activePage: string;
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const LogMatchButton = ({ activePage, underlineNavItemClass }: Props) => {
  if (activePage !== 'log-match') {
    return null;
  }
  return (
    <span
      className={underlineNavItemClass('log-match', false)}
    >Log a match</span>
  )
};

export default LogMatchButton;
