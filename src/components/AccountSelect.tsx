import React, { useState } from "react";
import Account from "../models/Account";

interface Props {
  activeAccount: Account | null;
  onChange: (val: string) => void;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  accounts: Array<Account>;
}

const AccountSelect = ({
  activeAccount,
  onChange,
  onPageChange,
  accounts
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (accounts.length < 1) {
    return null;
  }

  const containerClass = () => {
    const classes = ["select-menu", "d-inline-block"];
    if (isOpen) {
      classes.push("active");
    }
    return classes.join(" ");
  };

  const toggleButtonClass = () => {
    const classes = ["btn", "select-menu-button"];
    if (isOpen) {
      classes.push("selected");
    }
    return classes.join(" ");
  };

  const accountButtonClass = (accountID: string) => {
    const classes = ["select-menu-item", "text-left", "width-full", "btn-link"];
    if (activeAccount && activeAccount._id === accountID) {
      classes.push("selected");
    }
    return classes.join(" ");
  };

  const onAccountClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;

    button.blur();
    onChange(button.value);
    setIsOpen(false);
  };

  const manageAccounts = () => {
    setIsOpen(false);
    onPageChange("accounts");
  };

  return (
    <div className={containerClass()}>
      <button
        className={toggleButtonClass()}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {activeAccount ? activeAccount.battletag : "Select an account"}
      </button>
      <div className="select-menu-modal-holder">
        <div className="select-menu-modal">
          <div className="select-menu-list">
            {accounts.map(account => (
              <button
                className={accountButtonClass(account._id)}
                key={account._id}
                type="button"
                value={account._id}
                onClick={onAccountClick}
              >
                <span className="ion ion-ios-checkmark select-menu-item-icon" />
                <span className="select-menu-item-text">
                  {account.battletag}
                </span>
              </button>
            ))}
            <button
              className="select-menu-item text-bold text-left width-full btn-link"
              type="button"
              onClick={manageAccounts}
            >
              <span className="ion ion-ios-checkmark select-menu-item-icon" />
              <span className="select-menu-item-text">Manage accounts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelect;
