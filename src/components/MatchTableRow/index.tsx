import React, { forwardRef, MutableRefObject } from "react";
import Season from "../../models/Season";
import MatchRankImage from "../MatchRankImage";
import HeroImage from "../HeroImage";
import RoleImage from "../RoleImage";
import TimeOfDayEmoji from "../TimeOfDayEmoji";
import DayOfWeekEmoji from "../DayOfWeekEmoji";
import "./MatchTableRow.css";
import Match from "../../models/Match";
import EditMatchButton from "./EditMatchButton";
import RoleCell from "./RoleCell";
import OptionsCell from "./OptionsCell";
import HideSmallCell from "./HideSmallCell";
import NoWrap from "./NoWrap";
import MatchNumberCell from "./MatchNumberCell";
import ResultCell from "./ResultCell";
import SRChangeCell from "./SRChangeCell";
import DarkenSRChange from "./DarkenSRChange";
import RankCell from "./RankCell";
import StreakCell from "./StreakCell";
import MapCell from "./MapCell";
import GroupCell from "./GroupCell";
import { Tooltip, CounterLabel, Box } from "@primer/components";
import GroupList from "./GroupList";
import BadActorLabel from "./BadActorLabel";
import CssTruncateTarget from "../CssTruncateTarget";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

const groupSizeDescription = (groupSize: number) => {
  if (groupSize === 1) {
    return "solo queue";
  }
  if (groupSize === 2) {
    return "duo queue";
  }
  return `${groupSize}-stack`;
};

interface Props {
  match: Match;
  firstRankedMatchID?: string;
  firstMatchWithRank?: Match;
  isLast: boolean;
  index: number;
  priorMatches: Match[];
  rankChanges: number[];
  longestLossStreak: number;
  longestWinStreak: number;
  onEdit: (matchID: string) => void;
  showBadActor: boolean;
  showPlayOfTheGame: boolean;
  showJoinedVoice: boolean;
  showComment: boolean;
  showDayTime: boolean;
  showHeroes: boolean;
  showGroup: boolean;
  showRole: boolean;
  theme: string;
}

// Define a type that allows a ForwardedRef object to be mutable
// to workaround a current limitation of TS:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065#issuecomment-457650501).
type MutableForwardedRef<T> =
  | MutableRefObject<T | null>
  | ((ref: T | null) => void)
  | null;

const MatchTableRow = (
  {
    isLast,
    match,
    firstRankedMatchID,
    firstMatchWithRank,
    rankChanges,
    index,
    priorMatches,
    longestWinStreak,
    longestLossStreak,
    onEdit,
    showBadActor,
    showPlayOfTheGame,
    showJoinedVoice,
    showComment,
    showDayTime,
    showHeroes,
    showGroup,
    showRole,
    theme
  }: Props,
  ref: MutableForwardedRef<HTMLTableRowElement>
) => {
  const outerClass = () => {
    let classes: string[] = [];

    if (!isLast) {
      classes = classes.concat(["match-row", "pb-2", "mb-2"]);
    }
    if (match.isPlacement) {
      classes.push("match-placement-row");

      if (typeof match.rank === "number") {
        classes.push("match-last-placement-row");
      }
    } else if (firstRankedMatchID === match._id) {
      classes.push("match-placement-log-row");
    }

    return classes.join(" ");
  };

  const throwerTooltip = () => {
    const { allyThrower, enemyThrower } = match;
    const tooltip = [];

    if (allyThrower) {
      tooltip.push("Thrower on my team");
    }
    if (enemyThrower) {
      tooltip.push("Thrower on the enemy team");
    }

    return tooltip.join(" + ");
  };

  const leaverTooltip = () => {
    const { allyLeaver, enemyLeaver } = match;
    const tooltip = [];

    if (allyLeaver) {
      tooltip.push("Leaver on my team");
    }
    if (enemyLeaver) {
      tooltip.push("Leaver on the enemy team");
    }

    return tooltip.join(" + ");
  };

  const cheaterTooltip = () => {
    const { allyCheater, enemyCheater } = match;
    const tooltip = [];

    if (allyCheater) {
      tooltip.push("Cheater on my team");
    }
    if (enemyCheater) {
      tooltip.push("Cheater on the enemy team");
    }

    return tooltip.join(" + ");
  };

  const matchNumber = () => {
    let totalPlacementMatches = priorMatches.filter(match => match.isPlacement)
      .length;
    if (totalPlacementMatches < 1 && firstMatchWithRank) {
      totalPlacementMatches = 1;
    }

    if (match.isPlacement) {
      if (match.season >= Season.roleQueueSeasonStart) {
        const role = match.role;
        const priorMatchesInRole = priorMatches.filter(
          priorMatch => priorMatch.role === role
        );
        return `P${priorMatchesInRole.length + 1}`;
      }
      return `P${index + 1}`;
    }

    if (firstRankedMatchID === match._id && totalPlacementMatches === 1) {
      return "P";
    }

    return index - totalPlacementMatches + 1;
  };

  const getPriorMatchesWithRank = () => {
    if (match.season < Season.roleQueueSeasonStart) {
      // no role queue
      return priorMatches.filter(m => typeof m.rank === "number");
    }

    // role queue
    return priorMatches.filter(
      m => m.role === match.role && typeof m.rank === "number"
    );
  };

  const getPriorRank = () => {
    const matchesWithRank = getPriorMatchesWithRank();
    const priorMatch = matchesWithRank[matchesWithRank.length - 1];
    if (priorMatch) {
      return priorMatch.rank;
    }
  };

  const getPlacementRank = () => {
    let placementMatches = [];
    if (match.season < Season.roleQueueSeasonStart) {
      // no role queue
      placementMatches = priorMatches.filter(
        m => m.isPlacement && typeof m.rank === "number"
      );
    } else {
      // role queue
      placementMatches = priorMatches.filter(
        m =>
          m.isPlacement && m.role === match.role && typeof m.rank === "number"
      );
    }

    const lastPlacement = placementMatches[placementMatches.length - 1];
    if (lastPlacement) {
      return lastPlacement.rank;
    }

    const matchesWithRank = getPriorMatchesWithRank();
    const firstMatchWithRank = matchesWithRank[0];
    if (firstMatchWithRank) {
      return firstMatchWithRank.rank;
    }
  };

  const editMatch = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = event.currentTarget;
    const matchID = button.value;

    button.blur();
    onEdit(matchID);
  };

  const commentTooltip = () => {
    const { comment } = match;
    if (!comment) {
      return;
    }

    return comment.trim().replace(/"/g, "'");
  };

  const {
    rank,
    _id,
    groupList,
    heroList,
    comment,
    playOfTheGame,
    result,
    allyThrower,
    allyLeaver,
    allyCheater,
    enemyThrower,
    enemyLeaver,
    enemyCheater,
    map,
    role,
    rankChange,
    dayOfWeek,
    timeOfDay,
    groupSize,
    joinedVoice
  } = match;
  const timeAndDayPresent =
    dayOfWeek && timeOfDay && dayOfWeek.length > 0 && timeOfDay.length > 0;
  const isWin = match.isWin();
  const isLoss = match.isLoss();
  const priorRank = getPriorRank();
  const placementRank = getPlacementRank();
  const betterThanPlacement =
    typeof placementRank === "number"
      ? typeof match.rank === "number" && placementRank <= match.rank
      : undefined;

  return (
    <tr className={outerClass()} ref={ref}>
      <MatchNumberCell isPlacement={match.isPlacement}>
        {matchNumber()}
      </MatchNumberCell>
      {showRole && role && (
        <RoleCell isPlacement={match.isPlacement}>
          <RoleImage role={role} theme={theme} className="d-inline-block" />
        </RoleCell>
      )}
      <ResultCell result={result} theme={theme}>
        {result ? result.charAt(0).toUpperCase() : <span>&mdash;</span>}
      </ResultCell>
      <SRChangeCell
        rankChanges={rankChanges}
        theme={theme}
        result={match.result}
        isPlacement={match.isPlacement}
        rankChange={match.rankChange}
      >
        {typeof rankChange === "number" && (
          <DarkenSRChange result={match.result} />
        )}
        {typeof rankChange === "number" ? (
          <span style={{ position: "relative" }}>{rankChange}</span>
        ) : (
          <span>&mdash;</span>
        )}
      </SRChangeCell>
      <RankCell
        isPlacement={match.isPlacement}
        theme={theme}
        betterThanPlacement={betterThanPlacement}
      >
        <div className="d-flex flex-items-center flex-justify-center">
          {typeof rank === "number" && (
            <MatchRankImage
              rank={rank}
              priorRank={priorRank}
              className="d-inline-block mr-1 hide-sm"
            />
          )}
          {typeof rank === "number" ? rank : <span>&mdash;</span>}
        </div>
      </RankCell>
      <StreakCell
        result={match.result}
        longestWinStreak={longestWinStreak}
        longestLossStreak={longestLossStreak}
        isPlacement={match.isPlacement}
        winStreak={match.winStreak}
        lossStreak={match.lossStreak}
      >
        {isWin || isLoss ? <DarkenSRChange result={match.result} /> : null}
        {isWin ? (
          <span style={{ position: "relative" }}>{match.winStreak}</span>
        ) : isLoss ? (
          <span style={{ position: "relative" }}>{match.lossStreak}</span>
        ) : null}
      </StreakCell>
      <MapCell map={match.map}>
        <NoWrap>{map}</NoWrap>
      </MapCell>
      {showComment && (
        <HideSmallCell isPlacement={match.isPlacement}>
          <Tooltip aria-label={commentTooltip()} wrap={true}>
            <CssTruncateTarget>{comment}</CssTruncateTarget>
          </Tooltip>
        </HideSmallCell>
      )}
      {showHeroes && (
        <HideSmallCell
          style={{ paddingBottom: 0 }}
          isPlacement={match.isPlacement}
        >
          {heroList.map(hero => (
            <span
              key={hero}
              className="tooltipped tooltipped-n d-inline-block hero-portrait-container"
              aria-label={hero}
            >
              <HeroImage hero={hero} className="rounded-1 d-inline-block" />
            </span>
          ))}
        </HideSmallCell>
      )}
      {showDayTime && (
        <HideSmallCell isPlacement={match.isPlacement}>
          {timeAndDayPresent && dayOfWeek && timeOfDay && (
            <div
              className="tooltipped tooltipped-n"
              aria-label={`${capitalize(dayOfWeek)} ${capitalize(timeOfDay)}`}
            >
              <DayOfWeekEmoji dayOfWeek={dayOfWeek} />
              <span> </span>
              <TimeOfDayEmoji timeOfDay={timeOfDay} />
            </div>
          )}
        </HideSmallCell>
      )}
      {showGroup && (
        <GroupCell isPlacement={match.isPlacement}>
          {groupList.length > 0 && (
            <Tooltip aria-label={groupList.join(", ")} wrap={true}>
              <GroupList>{groupList.join(", ")} </GroupList>
            </Tooltip>
          )}
          {typeof groupSize === "number" &&
            groupList.length + 1 !== groupSize && (
              <CounterLabel>{groupSizeDescription(groupSize)}</CounterLabel>
            )}
        </GroupCell>
      )}
      {showBadActor && (
        <HideSmallCell isPlacement={match.isPlacement}>
          <NoWrap>
            {(allyThrower || enemyThrower) && (
              <BadActorLabel>
                <Tooltip aria-label={throwerTooltip()} wrap={true}>
                  T
                </Tooltip>
              </BadActorLabel>
            )}
            {(allyLeaver || enemyLeaver) && (
              <BadActorLabel>
                <Tooltip aria-label={leaverTooltip()} wrap={true}>
                  L
                </Tooltip>
              </BadActorLabel>
            )}
            {(allyCheater || enemyCheater) && (
              <BadActorLabel>
                <Tooltip aria-label={cheaterTooltip()} wrap={true}>
                  C
                </Tooltip>
              </BadActorLabel>
            )}
          </NoWrap>
        </HideSmallCell>
      )}
      {(showPlayOfTheGame || showJoinedVoice) && (
        <HideSmallCell isPlacement={match.isPlacement}>
          {playOfTheGame && (
            <Tooltip aria-label="Play of the game">
              <Box
                display={showJoinedVoice ? "inline-block" : "inline"}
                mr={showJoinedVoice ? 2 : 0}
              >
                <span role="img" aria-label="Party">
                  🎉
                </span>
              </Box>
            </Tooltip>
          )}
          {joinedVoice && (
            <Tooltip aria-label="Joined voice chat">
              <span role="img" aria-label="Speaker">
                🔊
              </span>
            </Tooltip>
          )}
        </HideSmallCell>
      )}
      <OptionsCell>
        <EditMatchButton onClick={editMatch} value={_id}>
          <Tooltip aria-label="Edit match" direction="w">
            <span className="ion ion-md-create" />
          </Tooltip>
        </EditMatchButton>
      </OptionsCell>
    </tr>
  );
};

export default forwardRef(MatchTableRow);
