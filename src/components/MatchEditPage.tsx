import React, { useState, useEffect } from "react";
import MatchDeleteForm from "./MatchDeleteForm";
import MatchForm from "./MatchForm";
import Match from "../models/Match";

interface Props {
  accountID: string;
  season: number;
  id: string;
  theme: string;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const getPriorMatches = (matches: Match[], id: string) => {
  let index = 0;
  for (const match of matches) {
    if (match._id === id) {
      break;
    }
    index++;
  }
  return matches.slice(0, index);
};

const MatchEditPage = ({
  accountID,
  season,
  theme,
  id,
  onPageChange
}: Props) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [match, setMatch] = useState<Match | null>(null);
  const [isLastPlacement, setIsLastPlacement] = useState<boolean | null>(null);

  useEffect(() => {
    async function getMatches() {
      const allMatches = await Match.findAll(accountID, season);
      const curMatch = allMatches.filter(m => m._id === id)[0];

      setMatch(curMatch);
      setMatches(allMatches);

      if (curMatch) {
        const isLast = await curMatch.isLastPlacement();
        setIsLastPlacement(isLast);
      }
    }

    getMatches();
  }, [accountID, season, id]);

  return (
    <div className="container layout-children-container">
      {match && typeof isLastPlacement === "boolean" && (
        <MatchForm
          id={id}
          priorMatches={getPriorMatches(matches, id)}
          theme={theme}
          season={match.season}
          accountID={match.accountID}
          isPlacement={match.isPlacement}
          isLastPlacement={isLastPlacement}
          onUpdate={() => onPageChange("matches", id)}
          rank={match.rank}
          comment={match.comment}
          map={match.map}
          group={match.group}
          groupSize={match.groupSize}
          heroes={match.heroes}
          playedAt={match.playedAt}
          dayOfWeek={match.dayOfWeek}
          timeOfDay={match.timeOfDay}
          allyThrower={match.allyThrower}
          allyLeaver={match.allyLeaver}
          enemyThrower={match.enemyThrower}
          enemyLeaver={match.enemyLeaver}
          playOfTheGame={match.playOfTheGame}
          result={match.result}
          role={match.role}
        />
      )}
      <div className="border-top pt-2 mt-4">
        <MatchDeleteForm id={id} onDelete={() => onPageChange("matches")} />
      </div>
    </div>
  );
};

export default MatchEditPage;
