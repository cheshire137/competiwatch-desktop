import React, { useState, useEffect } from "react";
import MatchesTable from "../MatchesTable";
import LoadingPage from "../LoadingPage";
import Match from "../../models/Match";
import Account from "../../models/Account";
import "./MatchesList.css";

interface Props {
  account: Account;
  season: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  scrollToMatch: boolean;
  scrollToMatchID: string | null;
  theme: string;
}

const MatchesList = ({
  account,
  season,
  onPageChange,
  scrollToMatch,
  theme,
  scrollToMatchID
}: Props) => {
  const [matches, setMatches] = useState<Array<Match> | null>(null);

  useEffect(() => {
    async function getMatches() {
      const m = await Match.findAll(account._id, season);
      setMatches(m);
    }

    getMatches();
  }, [account._id, season]);

  if (!matches) {
    return <LoadingPage />;
  }

  const anyMatches = matches.length > 0;

  return (
    <div className="mb-4">
      {anyMatches ? (
        <div>
          <MatchesTable
            season={season}
            matches={matches}
            theme={theme}
            onEdit={(matchID: string) => onPageChange("edit-match", matchID)}
            scrollToMatch={scrollToMatch}
            scrollToMatchID={scrollToMatchID}
          />
          <div className="d-flex mb-4 mt-2 flex-items-center flex-justify-between">
            <div className="text-small">
              <span>Replace your season {season} matches by </span>
              <button
                type="button"
                className="btn-link"
                onClick={() => onPageChange("import")}
              >
                importing them
              </button>
              <span> from a CSV file.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="blankslate">
          <h3 className="mb-2">
            No matches have been logged in season {season} for{" "}
            {account.battletag}
          </h3>
          <div className="d-flex flex-items-center flex-justify-between mx-auto populate-season-choices">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesList;
