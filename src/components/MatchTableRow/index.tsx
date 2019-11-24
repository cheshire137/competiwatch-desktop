import React from "react";
import CSS from 'csstype';
import ColorGradient from "../../models/ColorGradient";
import Season from "../../models/Season";
import MatchRankImage from "../MatchRankImage";
import HeroImage from "../HeroImage";
import RoleImage from "../RoleImage";
import TimeOfDayEmoji from "../TimeOfDayEmoji";
import DayOfWeekEmoji from "../DayOfWeekEmoji";
import "./MatchTableRow.css";
import Match from "../../models/Match";

const winColors = [
  [178, 212, 132],
  [102, 189, 125]
];
const lossColors = [
  [250, 170, 124],
  [246, 106, 110]
];
const neutralColor = [254, 234, 138];

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
  firstRankedMatchID: string;
  firstMatchWithRank: Match;
  isLast: boolean;
  index: number;
  priorMatches: Match[];
  rankChanges: number[];
  longestLossStreak: number;
  longestWinStreak: number;
  onEdit: (id: string) => void;
  showThrowerLeaver: boolean;
  showPlayOfTheGame: boolean;
  showJoinedVoice: boolean;
  showComment: boolean;
  showDayTime: boolean;
  showHeroes: boolean;
  showGroup: boolean;
  showRole: boolean;
  theme: string;
}

const MatchTableRow = ({ isLast, match, firstRankedMatchID, firstMatchWithRank, rankChanges, index, priorMatches, longestWinStreak, longestLossStreak, onEdit, showThrowerLeaver, showPlayOfTheGame, showJoinedVoice, showComment, showDayTime, showHeroes, showGroup, showRole, theme }: Props) => {
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

  const mapBackgroundClass = () => {
    const { map }  = match;
    if (!map) {
      return "";
    }

    const slug = map
      .toLowerCase()
      .replace(/:/g, "")
      .replace(/[\s']/g, "-");
    return `background-${slug}`;
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

  const matchNumberClass = () => {
    const classes = ["match-cell", "hide-sm", "match-number-cell"];

    if (match.isPlacement) {
      classes.push("match-placement-number-cell");
    }

    return classes.join(" ");
  };

  const rankChangeStyle = () => {
    const style: CSS.Properties = {};

    if (match.isPlacement) {
      return style;
    }

    let color = null;
    if (match.result === "draw") {
      color = neutralColor;
    } else {
      const colorRange = match.result === "win" ? winColors : lossColors;
      const gradient = new ColorGradient(colorRange, rankChanges.length);
      const rgbColors = gradient.rgb();
      const index = typeof match.rankChange === "number" ? rankChanges.indexOf(match.rankChange) : -1;

      if (typeof index === "number") {
        color = rgbColors[index];
      }
    }

    if (color) {
      style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }

    return style;
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

  const rankClass = () => {
    const classes = ["match-cell", "rank-cell"];
    const placementRank = getPlacementRank();

    if (typeof placementRank === "number") {
      if (typeof match.rank === "number" && placementRank > match.rank) {
        classes.push("worse-than-placement");
      } else {
        classes.push("better-than-placement");
      }
    }

    return classes.join(" ");
  };

  const streakClass = () => {
    const classes = ["match-cell", "position-relative", "hide-sm"];
    if (match.isDraw()) {
      classes.push("streak-empty");
    }
    return classes.join(" ");
  };

  const streakStyle = () => {
    const style: CSS.Properties = {};
    let colors: number[][] = [];
    let stepCount = 0;
    const streakList = [];
    let streak: number | undefined = 0;

    if (match.isWin()) {
      colors = winColors;
      stepCount = longestWinStreak;
      streak = match.winStreak;
    } else if (match.isLoss()) {
      colors = lossColors;
      stepCount = longestLossStreak;
      streak = match.lossStreak;
    }

    if (colors.length > 0) {
      for (let i = 1; i <= stepCount; i++) {
        streakList.push(i);
      }
      const gradient = new ColorGradient(colors, stepCount);
      const rgbColors = gradient.rgb();
      const index = typeof streak === "number" ? streakList.indexOf(streak) : -1;
      const color = rgbColors[index];
      style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }

    return style;
  };

  const editMatch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  const roleClass = () => {
    const { role } = match;
    return `match-cell role-cell role-${role}`;
  };

  const commentClass = () => {
    const { comment } = match;
    let classes = ["match-cell", "hide-sm", "comment-cell", "css-truncate"];

    if (comment && comment.trim().length > 0) {
      classes = classes.concat([
        "tooltipped",
        "tooltipped-multiline",
        "tooltipped-n"
      ]);
    }

    return classes.join(" ");
  };

  const groupClass = () => {
    const { groupList } = match;
    let classes = ["match-cell", "hide-sm", "css-truncate", "group-cell"];

    if (groupList.length > 0) {
      classes = classes.concat([
        "tooltipped",
        "tooltipped-n",
        "tooltipped-multiline"
      ]);
    }

    return classes.join(" ");
  };

  const groupTooltip = () => {
    const { groupList } = match;
    if (groupList.length < 1) {
      return;
    }

    return groupList.join(", ");
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
    enemyThrower,
    enemyLeaver,
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

  return (
    <tr className={outerClass()}>
      <td className={matchNumberClass()}>{matchNumber()}</td>
      {showRole && role && (
        <td className={roleClass()}>
          <RoleImage role={role} theme={theme} className="d-inline-block" />
        </td>
      )}
      <td className={`match-cell hide-sm result-cell result-${result}`}>
        {result ? result.charAt(0).toUpperCase() : <span>&mdash;</span>}
      </td>
      <td
        style={rankChangeStyle()}
        className="position-relative match-cell sr-change-cell"
      >
        {typeof rankChange === "number" ? (
          <span className={`darken-change darken-change-${result}`} />
        ) : null}
        {typeof rankChange === "number" ? (
          <span className="position-relative">{rankChange}</span>
        ) : (
          <span>&mdash;</span>
        )}
      </td>
      <td className={rankClass()}>
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
      </td>
      <td className={streakClass()} style={streakStyle()}>
        {isWin || isLoss ? (
          <span className={`darken-change darken-change-${result}`} />
        ) : null}
        {isWin ? (
          <span className="position-relative">{match.winStreak}</span>
        ) : isLoss ? (
          <span className="position-relative">{match.lossStreak}</span>
        ) : null}
      </td>
      <td className={`match-cell no-wrap ${mapBackgroundClass()}`}>
        {map}
      </td>
      {showComment ? (
        <td
          className={commentClass()}
          aria-label={commentTooltip()}
        >
          <span className="css-truncate-target comment-truncate-target">
            {comment}
          </span>
        </td>
      ) : null}
      {showHeroes ? (
        <td className="match-cell hide-sm heroes-cell">
          {heroList.map(hero => (
            <span
              key={hero}
              className="tooltipped tooltipped-n d-inline-block hero-portrait-container"
              aria-label={hero}
            >
              <HeroImage hero={hero} className="rounded-1 d-inline-block" />
            </span>
          ))}
        </td>
      ) : null}
      {showDayTime ? (
        <td className="match-cell text-center hide-sm time-cell no-wrap">
          {timeAndDayPresent && dayOfWeek && timeOfDay ? (
            <div
              className="tooltipped tooltipped-n"
              aria-label={`${capitalize(dayOfWeek)} ${capitalize(timeOfDay)}`}
            >
              <DayOfWeekEmoji dayOfWeek={dayOfWeek} />
              <span> </span>
              <TimeOfDayEmoji timeOfDay={timeOfDay} />
            </div>
          ) : null}
        </td>
      ) : null}
      {showGroup ? (
        <td className={groupClass()} aria-label={groupTooltip()}>
          {groupList.length > 0 ? (
            <span className="css-truncate-target group-truncate-target">
              {groupList.join(", ")}{" "}
            </span>
          ) : null}
          {typeof groupSize === "number" && groupList.length + 1 !== groupSize && (
            <span className="Counter">{groupSizeDescription(groupSize)}</span>
          )}
        </td>
      ) : null}
      {showThrowerLeaver ? (
        <td className="match-cell no-wrap hide-sm throwers-leavers-cell">
          {allyThrower || enemyThrower ? (
            <span
              className="Counter tooltipped tooltipped-n text-white bg-red"
              aria-label={throwerTooltip()}
            >
              T
            </span>
          ) : null}
          {allyLeaver || enemyLeaver ? (
            <span
              className="Counter tooltipped tooltipped-n text-white bg-red"
              aria-label={leaverTooltip()}
            >
              L
            </span>
          ) : null}
        </td>
      ) : null}
      {showPlayOfTheGame || showJoinedVoice ? (
        <td className="match-cell hide-sm potg-cell">
          {playOfTheGame ? (
            <span
              className={`tooltipped tooltipped-n ${
                showJoinedVoice ? "d-inline-block mr-2" : ""
              }`}
              aria-label="Play of the game"
            >
              <span role="img" aria-label="Party">
                🎉
              </span>
            </span>
          ) : null}
          {joinedVoice ? (
            <span
              className="tooltipped tooltipped-n"
              aria-label="Joined voice chat"
            >
              <span role="img" aria-label="Speaker">
                🔊
              </span>
            </span>
          ) : null}
        </td>
      ) : null}
      <td className="match-cell options-cell">
        <button
          type="button"
          onClick={editMatch}
          className="btn-link link-gray tooltipped tooltipped-w"
          aria-label="Edit this match"
          value={_id}
        >
          <span className="ion ion-md-create" />
        </button>
      </td>
    </tr>
  );
};

export default MatchTableRow;
