import React, { useState, useEffect } from "react";
import Match from "../models/Match";
import Season from "../models/Season";
import MatchForm from "./MatchForm";
import LayoutChildrenContainer from "./LayoutChildrenContainer";
import LinkButton from "./LinkButton";

interface Props {
  accountID: string;
  season: Season;
  latestSeason: Season;
  latestRank: number;
  theme: string;
  openQueue: boolean;
  latestGroup: string | null;
  onSeasonChange: (season: Season) => void;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const MatchCreatePage = ({
  accountID,
  latestGroup,
  latestRank,
  theme,
  openQueue,
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
    <LayoutChildrenContainer>
      {season < latestSeason && (
        <p className="flash flash-warn">
          You are logging a match for a past competitive season. Did you want
          <span> to </span>
          <LinkButton onClick={() => onSeasonChange(latestSeason)}>
            log a match in season {latestSeason}
          </LinkButton>
          ?
        </p>
      )}
      <MatchForm
        season={season}
        accountID={accountID}
        rank={latestRank}
        latestGroup={latestGroup}
        theme={theme}
        openQueue={openQueue}
        onCreate={(id?: string) => onPageChange("matches", id)}
        priorMatches={matches}
      />
    </LayoutChildrenContainer>
  );
};

export default MatchCreatePage;
