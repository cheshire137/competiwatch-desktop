import React, { useState, useEffect } from "react";
import SeasonDeleteForm from "./SeasonDeleteForm";
import Season from "../models/Season";

interface Props {
  seasonNumber: number;
  index: number;
  onDelete: (season: number) => void;
  firstNonDeletableSeason: number;
}

const listItemClass = (index: number) => {
  let classes: string[] = [];
  if (index > 0) {
    classes = classes.concat(["border-top", "pt-2", "mt-2"]);
  }
  return classes.join(" ");
};

const SeasonListItem = ({
  seasonNumber,
  index,
  firstNonDeletableSeason,
  onDelete
}: Props) => {
  const [totalMatches, setTotalMatches] = useState(-1);

  useEffect(() => {
    async function getTotalMatches() {
      const total = await Season.totalMatches(seasonNumber);
      setTotalMatches(total);
    }

    getTotalMatches();
  }, [seasonNumber]);

  return (
    <li className={listItemClass(index)}>
      <div className="d-flex mb-1 flex-justify-between flex-items-center">
        <span className="text-bold">Season {seasonNumber}</span>
        {seasonNumber > firstNonDeletableSeason && index === 0 ? (
          <SeasonDeleteForm seasonNumber={seasonNumber} onDelete={onDelete} />
        ) : null}
      </div>
      {totalMatches > 0 ? (
        <div className="text-gray text-small">
          {totalMatches} match{totalMatches === 1 ? null : "es"}
        </div>
      ) : null}
    </li>
  );
};

export default SeasonListItem;
