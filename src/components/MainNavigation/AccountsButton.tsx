import React from 'react';

interface Props {
  activePage: string;
  onPageChange: (event: any) => {};
  underlineNavItemClass: (page: string, isButton: boolean) => string;
}

const AccountsButton = ({ activePage, onPageChange, underlineNavItemClass }: Props) => {
  if (activePage === 'accounts') {
    return null;
  }

  return (
    <button
      name="accounts"
      type="button"
      className={underlineNavItemClass('accounts', true)}
      onClick={onPageChange}
    >Accounts</button>
  );
};

export default AccountsButton;
