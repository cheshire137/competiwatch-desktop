import React from "react";
import Season from "../models/Season";

interface Props {
  onDelete: (season: Season, allSeasons: Season[]) => void;
  season: Season;
}

const SeasonDeleteForm = ({ onDelete, season }: Props) => {
  const deleteSeason = async () => {
    const message = `Are you sure you want to delete season ${season.number}?`;
    if (!window.confirm(message)) {
      return;
    }
    await season.delete();
    const allSeasons = await Season.findAll();
    onDelete(season, allSeasons);
  };

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        deleteSeason();
      }}
    >
      <button type="submit" className="btn-link text-red text-small">
        Delete season {season.number}
      </button>
    </form>
  );
};

export default SeasonDeleteForm;
