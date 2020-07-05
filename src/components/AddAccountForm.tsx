import React from "react";
import Account from "../models/Account";
import AccountForm from "./AccountForm";
import Note from "./Note";

interface Props {
  accounts: Account[];
  onCreate?: () => void;
  onAccountUpdate: () => void;
}

const AddAccountForm = ({
  accounts,
  onCreate,
  onAccountUpdate
}: Props) => (
    <>
      <h2 className="h2 text-normal mb-2">
        {accounts.length > 0 ? "Add another account" : "Add an account"}
      </h2>
      {accounts.length < 1 && (
        <p>Add an account to begin logging competitive matches.</p>
      )}
      <AccountForm
        onCreate={onCreate}
        onUpdate={onAccountUpdate}
        totalAccounts={accounts.length}
      />
      {accounts.length > 0 && (
        <Note>
          <strong>Tip:</strong> the numbers at the end aren't required.
        </Note>
      )}
    </>
  );

export default AddAccountForm;
