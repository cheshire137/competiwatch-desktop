import React, { useRef, useEffect } from "react";
import MatchTableRow from "./MatchTableRow";
import Season from "../models/Season";
import Match, { MatchResult } from "../models/Match";
import MatchHeader from "./MatchHeader";
import OptionsHeader from "./OptionsHeader";
import { Tooltip } from "@primer/components";

interface Props {
  matches: Match[];
  season: Season;
  onEdit: (matchID: string) => void;
  theme: string;
  scrollToMatchID: string | null;
}

type MatchResultToRankChange = {
  [result: string]: number[];
};

const MatchesTable = ({
  matches,
  season,
  onEdit,
  theme,
  scrollToMatchID
}: Props) => {
  const lastMatchRow = useRef<HTMLTableRowElement>();
  const targetMatchRow = useRef<HTMLTableRowElement>();

  const matchRankChangesByResult = () => {
    const results: MatchResult[] = ["win", "loss"];
    const rankChanges: MatchResultToRankChange = {
      win: [],
      loss: [],
      draw: []
    };

    for (const result of results) {
      const matchesWithResult = matches.filter(
        match => match.result === result
      );
      const rankChangesForResult = matchesWithResult
        .map(match => match.rankChange)
        .filter(rankChange => typeof rankChange === "number")
        .sort();

      for (const rankChange of rankChangesForResult) {
        if (rankChange) {
          if (!rankChanges[result].includes(rankChange)) {
            rankChanges[result].push(rankChange);
          }
        }
      }
    }

    return rankChanges;
  };

  const showBadActorColumn = () => {
    return (
      matches.filter(
        match =>
          match.allyThrower ||
          match.allyLeaver ||
          match.enemyThrower ||
          match.enemyLeaver
      ).length > 0
    );
  };

  const showPlayOfTheGameColumn = () => {
    return matches.filter(match => match.playOfTheGame).length > 0;
  };

  const showJoinedVoiceColumn = () => {
    return matches.filter(match => match.joinedVoice).length > 0;
  };

  const showCommentColumn = () => {
    return (
      matches.filter(match => match.comment && match.comment.trim().length > 0)
        .length > 0
    );
  };

  const showDayTimeColumn = () => {
    return (
      matches.filter(match => match.dayOfWeek && match.timeOfDay).length > 0
    );
  };

  const showHeroesColumn = () => {
    return matches.filter(match => match.heroList.length > 0).length > 0;
  };

  const showGroupColumn = () => {
    return (
      matches.filter(
        match =>
          match.groupList.length > 0 ||
          (typeof match.groupSize === "number" && match.groupSize > 1)
      ).length > 0
    );
  };

  const showRoleColumn = () => {
    return (
      !season.openQueue &&
      matches.filter(match => typeof match.role === "string").length > 0
    );
  };

  const getLongestWinStreak = () => {
    const winStreaks: number[] = [];
    for (const match of matches) {
      if (typeof match.winStreak === "number") {
        winStreaks.push(match.winStreak);
      }
    }
    if (winStreaks.length < 1) {
      return 0;
    }
    return Math.max(...winStreaks);
  };

  const getLongestLossStreak = () => {
    const lossStreaks: number[] = [];
    for (const match of matches) {
      if (typeof match.lossStreak === "number") {
        lossStreaks.push(match.lossStreak);
      }
    }
    if (lossStreaks.length < 1) {
      return 0;
    }
    return Math.max(...lossStreaks);
  };

  const rankChanges = matchRankChangesByResult();
  const showBadActor = showBadActorColumn();
  const showPlayOfTheGame = showPlayOfTheGameColumn();
  const showJoinedVoice = showJoinedVoiceColumn();
  const showComment = showCommentColumn();
  const showDayTime = showDayTimeColumn();
  const showHeroes = showHeroesColumn();
  const showGroup = showGroupColumn();
  const showRole = showRoleColumn();
  const longestWinStreak = getLongestWinStreak();
  const longestLossStreak = getLongestLossStreak();

  useEffect(() => {
    const scrollToComponent = require("react-scroll-to-component");

    if (targetMatchRow.current) {
      scrollToComponent(targetMatchRow.current);
    } else if (lastMatchRow.current) {
      scrollToComponent(lastMatchRow.current);
    }
  }, [scrollToMatchID]);

  return (
    <table className="width-full">
      <thead>
        <tr className="match-header-row">
          <MatchHeader hideSmall={true}>#</MatchHeader>
          {showRole && <MatchHeader hideSmall={true}>Role</MatchHeader>}
          <MatchHeader hideSmall={true}>Win/Loss</MatchHeader>
          <MatchHeader noWrap={true}>+/- SR</MatchHeader>
          <MatchHeader>Rank</MatchHeader>
          <MatchHeader hideSmall={true} noWrap={true}>
            Streak
          </MatchHeader>
          <MatchHeader>Map</MatchHeader>
          {showComment ? (
            <MatchHeader hideSmall={true}>Comment</MatchHeader>
          ) : null}
          {showHeroes ? (
            <MatchHeader hideSmall={true}>Heroes</MatchHeader>
          ) : null}
          {showDayTime ? (
            <MatchHeader hideSmall={true}>Day/Time</MatchHeader>
          ) : null}
          {showGroup ? <MatchHeader hideSmall={true}>Group</MatchHeader> : null}
          {showBadActor ? (
            <MatchHeader hideSmall={true}>
              <Tooltip aria-label="Throwers, leavers, and cheaters">
                <span role="img" aria-label="Sad face">
                  😢
                </span>
              </Tooltip>
            </MatchHeader>
          ) : null}
          {showPlayOfTheGame || showJoinedVoice ? (
            <MatchHeader hideSmall={true}>Other</MatchHeader>
          ) : null}
          <OptionsHeader></OptionsHeader>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, i) => {
          const isLast = i === matches.length - 1;
          const matchRankChanges = match.result
            ? rankChanges[match.result] || []
            : [];

          return (
            <MatchTableRow
              key={match._id}
              match={match}
              index={i}
              theme={theme}
              ref={(row: HTMLTableRowElement) => {
                if (match._id && match._id === scrollToMatchID) {
                  targetMatchRow.current = row;
                }
                if (isLast) {
                  lastMatchRow.current = row;
                }
              }}
              rankChanges={matchRankChanges}
              isLast={isLast}
              onEdit={onEdit}
              priorMatches={matches.slice(0, i)}
              showBadActor={showBadActor}
              showPlayOfTheGame={showPlayOfTheGame}
              showJoinedVoice={showJoinedVoice}
              showDayTime={showDayTime}
              showComment={showComment}
              showHeroes={showHeroes}
              showGroup={showGroup}
              showRole={showRole}
              longestWinStreak={longestWinStreak}
              longestLossStreak={longestLossStreak}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default MatchesTable;
