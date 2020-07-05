import React from "react";
import Season from "../models/Season";

interface Props {
  onDelete: (season: Season, priorSeason: Season) => void;
  season: Season;
}

const SeasonDeleteForm = ({ onDelete, season }: Props) => {
  const deleteSeason = async () => {
    const message = `Are you sure you want to delete season ${season.number} (${season.description()})?`;

    if (!window.confirm(message)) {
      return;
    }

    const priorSeason = await season.priorSeason();
    await season.delete();

    onDelete(season, priorSeason);
  };

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        deleteSeason();
      }}
    >
      <button type="submit" className="btn-link text-red text-small">
        Delete season {season.number} ({season.description()})
      </button>
    </form>
  );
};

export default SeasonDeleteForm;
