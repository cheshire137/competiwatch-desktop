import React, { useState } from 'react';
import Account from '../models/Account';

interface Props {
  battletag: string;
  id: string;
  onDelete: () => void;
}

const AccountDeleteForm = ({ battletag, id, onDelete }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const account = new Account({ _id: id })
  account.hasMatches().then((hasMatches: boolean) => {
    if (!hasMatches) {
      setShowForm(true);
    }
  })

  if (!showForm) {
    return null;
  }

  const deleteAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = `Are you sure you want to delete ${battletag}?`

    if (window.confirm(message)) {
      const account = new Account({ _id: id });
      account.delete().then(onDelete);
    }
  };

  return (
    <form onSubmit={deleteAccount}>
      <button
        type="submit"
        className="btn-link text-red text-small"
      >Delete account</button>
    </form>
  );
};

export default AccountDeleteForm;
