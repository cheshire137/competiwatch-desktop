import React from "react";
import Match from "../models/Match";

const deleteMatch = (
  event: React.FormEvent<HTMLFormElement>,
  { id, onDelete }: Props
) => {
  event.preventDefault();
  const message = "Are you sure you want to delete this match?";

  if (window.confirm(message)) {
    Match.delete(id).then(onDelete);
  }
};

interface Props {
  id: string;
  onDelete: () => void;
}

const MatchDeleteForm = (props: Props) => (
  <form className="mb-4" onSubmit={evt => deleteMatch(evt, props)}>
    <button type="submit" className="btn-link text-red text-small">
      Delete match
    </button>
  </form>
);

export default MatchDeleteForm;
