import React from "react";
import Match from "../models/Match";

interface Props {
  id: string;
  onDelete: () => void;
}

const MatchDeleteForm = ({ id, onDelete }: Props) => {
  const deleteMatch = async () => {
    const message = "Are you sure you want to delete this match?";

    if (window.confirm(message)) {
      await Match.delete(id);
      onDelete();
    }
  };

  return (
    <form className="mb-4" onSubmit={evt => {
      evt.preventDefault();
      deleteMatch();
    }}>
      <button type="submit" className="btn-link text-red text-small">
        Delete match
      </button>
    </form>
  );
};

export default MatchDeleteForm;
