import React, { useState } from 'react'
import MatchesTable from './MatchesTable'
import LoadingPage from './LoadingPage'
import Match from '../models/Match'
import Account from '../models/Account'
import './MatchesList.css'

interface Props {
  account: Account;
  season: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => {};
  scrollToMatch: boolean;
  scrollToMatchID?: string;
  theme: string;
}

const MatchesList = ({ account, season, onPageChange, scrollToMatch, theme, scrollToMatchID }: Props) => {
  const [matches, setMatches] = useState<Array<Match>>([]);

  Match.findAll(account._id, season).then(m => setMatches(m));

  const anyMatches = matches.length > 0
  if (!anyMatches) {
    return <LoadingPage />;
  }

  return (
    <div className="mb-4">
      {anyMatches ? (
        <div>
          <MatchesTable
            season={season}
            matches={matches}
            theme={theme}
            onEdit={(matchID: string) => onPageChange('edit-match', matchID)}
            scrollToMatch={scrollToMatch}
            scrollToMatchID={scrollToMatchID}
          />
          <div className="d-flex mb-4 mt-2 flex-items-center flex-justify-between">
            <div className="text-small">
              <span>Replace your season {season} matches by </span>
              <button
                type="button"
                className="btn-link"
                onClick={() => onPageChange('import')}
              >importing them</button>
              <span> from a CSV file.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="blankslate">
          <h3
            className="mb-2"
          >No matches have been logged in season {season} for {account.battletag}</h3>
          <div className="d-flex flex-items-center flex-justify-between mx-auto populate-season-choices">
            <button
              type="button"
              className="btn-large btn btn-primary"
              onClick={() => onPageChange('log-match')}
            >Log a match</button>
            or
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => onPageChange('import')}
            >Import matches</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesList;
