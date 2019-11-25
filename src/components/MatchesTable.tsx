import React, { useState, useRef, useCallback } from "react";
import MatchTableRow from "./MatchTableRow";
import Season from "../models/Season";
import Match, { MatchResult } from "../models/Match";

interface Props {
  matches: Match[];
  season: number;
  onEdit: () => void;
  theme: string;
  scrollToMatch: boolean;
  scrollToMatchID: string | null;
}

type MatchResultToRankChange = {
  [result: string]: number[];
};

type MatchRowsByID = {
  [id: string]: React.MutableRefObject<HTMLTableRowElement>;
};

const MatchesTable = ({
  matches,
  season,
  onEdit,
  theme,
  scrollToMatch,
  scrollToMatchID
}: Props) => {
  const lastMatchRow = useRef<HTMLTableRowElement>();
  const matchRowsByID: MatchRowsByID = {};

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

  const showThrowerLeaverColumn = () => {
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
      season >= Season.roleQueueSeasonStart &&
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

  if (!scrollToMatch) {
    return null;
  }

  const scrollToComponent = require("react-scroll-to-component");

  if (scrollToMatchID) {
    if (
      matchRowsByID[scrollToMatchID] &&
      matchRowsByID[scrollToMatchID].current
    ) {
      scrollToComponent(matchRowsByID[scrollToMatchID].current);
    }
  } else if (lastMatchRow.current) {
    scrollToComponent(lastMatchRow.current);
  }

  const rankChanges = matchRankChangesByResult();
  const showThrowerLeaver = showThrowerLeaverColumn();
  const showPlayOfTheGame = showPlayOfTheGameColumn();
  const showJoinedVoice = showJoinedVoiceColumn();
  const showComment = showCommentColumn();
  const showDayTime = showDayTimeColumn();
  const showHeroes = showHeroesColumn();
  const showGroup = showGroupColumn();
  const showRole = showRoleColumn();
  const longestWinStreak = getLongestWinStreak();
  const longestLossStreak = getLongestLossStreak();

  return (
    <table className="width-full">
      <thead>
        <tr className="match-header-row">
          <th className="match-header hide-sm">#</th>
          {showRole && <th className="match-header hide-sm">Role</th>}
          <th className="match-header hide-sm">Win/Loss</th>
          <th className="match-header no-wrap">+/- SR</th>
          <th className="match-header">Rank</th>
          <th className="match-header hide-sm no-wrap">Streak</th>
          <th className="match-header">Map</th>
          {showComment ? (
            <th className="match-header hide-sm">Comment</th>
          ) : null}
          {showHeroes ? <th className="match-header hide-sm">Heroes</th> : null}
          {showDayTime ? (
            <th className="match-header hide-sm">Day/Time</th>
          ) : null}
          {showGroup ? <th className="match-header hide-sm">Group</th> : null}
          {showThrowerLeaver ? (
            <th
              className="match-header hide-sm tooltipped tooltipped-n"
              aria-label="Throwers and leavers"
            >
              <span role="img" aria-label="Sad face">
                😢
              </span>
            </th>
          ) : null}
          {showPlayOfTheGame || showJoinedVoice ? (
            <th className="match-header hide-sm">Other</th>
          ) : null}
          <th className="match-header options-header"></th>
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
                if (match._id) {
                  matchRowsByID[match._id].current = row;
                }
                if (isLast) {
                  lastMatchRow.current = row;
                }
              }}
              rankChanges={matchRankChanges}
              isLast={isLast}
              onEdit={onEdit}
              priorMatches={matches.slice(0, i)}
              showThrowerLeaver={showThrowerLeaver}
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
