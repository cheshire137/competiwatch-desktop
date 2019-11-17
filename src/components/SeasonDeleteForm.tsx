import React from 'react'
import Season from '../models/Season'

interface Props {
  onDelete: (season: number) => void;
  seasonNumber: number;
}

const SeasonDeleteForm = ({ onDelete, seasonNumber }: Props) => {
  const deleteSeason = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = `Are you sure you want to delete season ${seasonNumber}? Matches logged in this season will NOT be deleted.`
    if (window.confirm(message)) {
      new Season({ number: seasonNumber }).delete().then(() => onDelete(seasonNumber));
    }
  }

  return (
    <form onSubmit={deleteSeason}>
      <button
        type="submit"
        className="btn-link text-red text-small"
      >Delete season</button>
    </form>
  );
};

export default SeasonDeleteForm;
