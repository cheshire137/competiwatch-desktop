import React from "react";
import SeasonListItem from "./SeasonListItem";

interface Props {
  latestSeason: number;
  firstNonDeletableSeason: number;
  onDelete: (season: number) => void;
}

const SeasonsList = ({
  latestSeason,
  firstNonDeletableSeason,
  onDelete
}: Props) => {
  const seasons = Array.from(
    { length: latestSeason },
    (v, k) => k + 1
  ).reverse();

  return (
    <ul className="list-style-none mb-4">
      {seasons.map((season, i) => (
        <SeasonListItem
          key={season}
          firstNonDeletableSeason={firstNonDeletableSeason}
          onDelete={onDelete}
          seasonNumber={season}
          index={i}
        />
      ))}
    </ul>
  );
};

export default SeasonsList;
