import React from 'react';

interface Props {
  activePage: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const AccountsButton = ({ activePage, onPageChange, underlineNavItemClass }: Props) => {
  if (activePage === 'accounts') {
    return null;
  }

  return (
    <button
      type="button"
      className={underlineNavItemClass('accounts', true)}
      onClick={() => onPageChange('accounts')}
    >Accounts</button>
  );
};

export default AccountsButton;
