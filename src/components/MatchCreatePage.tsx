import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function getMatches() {
      const allMatches = await Match.findAll(accountID, season);
      setMatches(allMatches);
    }

    getMatches();
  }, [accountID, season]);

  if (!matches) {
    return null;
  }

  return (
    <div className="container layout-children-container">
      {season < latestSeason && (
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
      )}
      <MatchForm
        season={season}
        accountID={accountID}
        rank={latestRank}
        latestGroup={latestGroup}
        theme={theme}
        onCreate={() => onPageChange("matches")}
        priorMatches={matches}
      />
    </div>
  );
};

export default MatchCreatePage;
