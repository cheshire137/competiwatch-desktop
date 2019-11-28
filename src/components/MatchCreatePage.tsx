import React, { useState } from "react";
import Match from "../models/Match";
import MatchForm from "./MatchForm";

interface Props {
  accountID: string;
  season: number;
  latestSeason: number;
  latestRank: number;
  theme: string;
  latestGroup: string | null;
  onSeasonChange: (season: number) => void;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const MatchCreatePage = ({
  accountID,
  latestGroup,
  latestRank,
  theme,
  season,
  latestSeason,
  onSeasonChange,
  onPageChange
}: Props) => {
  const [matches, setMatches] = useState<Match[] | null>(null);

  Match.findAll(accountID, season).then(m => setMatches(m));

  if (!matches) {
    return null;
  }

  return (
    <div className="container layout-children-container">
      {season < latestSeason ? (
        <p className="flash flash-warn">
          You are logging a match for a past competitive season. Did you want
          <span> to </span>
          <button
            type="button"
            className="btn-link"
            onClick={() => onSeasonChange(latestSeason)}
          >
            log a match in season {latestSeason}
          </button>
          ?
        </p>
      ) : null}
      <MatchForm
        season={season}
        accountID={accountID}
        rank={latestRank}
        latestGroup={latestGroup}
        theme={theme}
        onCreate={() => onPageChange("matches", true)}
        priorMatches={matches}
      />
    </div>
  );
};

export default MatchCreatePage;
