import React, { useState, useEffect } from "react";
import MatchesTable from "./MatchesTable";
import LoadingPage from "./LoadingPage";
import Match from "../models/Match";
import Season from "../models/Season";
import Account from "../models/Account";
import Blankslate from "./Blankslate";
import { Box, Flex } from "@primer/components";

interface Props {
  account: Account;
  season: Season;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  scrollToMatchID: string | null;
  theme: string;
  openQueue: boolean;
}

const MatchesList = ({
  account,
  season,
  onPageChange,
  theme,
  openQueue,
  scrollToMatchID
}: Props) => {
  const [matches, setMatches] = useState<Array<Match> | null>(null);

  useEffect(() => {
    async function getMatches() {
      const m = await Match.findAll(account._id, season, openQueue);
      setMatches(m);
    }

    getMatches();
  }, [account._id, season.number, scrollToMatchID, openQueue]);

  if (!matches) {
    return <LoadingPage />;
  }

  const anyMatches = matches.length > 0;

  return (
    <Box mb={4}>
      {anyMatches ? (
        <MatchesTable
          season={season}
          matches={matches}
          theme={theme}
          onEdit={(matchID: string) => onPageChange("edit-match", matchID)}
          scrollToMatchID={scrollToMatchID}
        />
      ) : (
        <Blankslate>
          <h3 className="mb-2">
            No matches have been logged in season {season.number} ({openQueue ? 'open' : 'role'} queue) for{" "}
            {account.battletag}
          </h3>
          <Flex alignItems="center" width="21em" justifyItems="space-between" mx="auto">
            <button
              type="button"
              className="btn-large btn btn-primary"
              onClick={() => onPageChange("log-match")}
            >
              Log a match
            </button>
            or
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => onPageChange("import")}
            >
              Import matches
            </button>
          </Flex>
        </Blankslate>
      )}
    </Box>
  );
};

export default MatchesList;
