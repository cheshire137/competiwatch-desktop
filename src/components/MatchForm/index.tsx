import React, { useState, useEffect, useRef } from "react";
import Match, { MatchData, MatchResult } from "../../models/Match";
import { Map } from "../../models/Map";
import { HeroesByRole, Hero, HeroRoles, HeroRole } from "../../models/Hero";
import Season from "../../models/Season";
import Account from "../../models/Account";
import DayTimeApproximator, {
  DayOfWeek,
  TimeOfDay
} from "../../models/DayTimeApproximator";
import MapSelect from "../MapSelect";
import HeroSelect from "../HeroSelect";
import RoleSelect from "../RoleSelect";
import TimeOfDayEmoji from "../TimeOfDayEmoji";
import DayOfWeekEmoji from "../DayOfWeekEmoji";
import GroupMembersField from "../GroupMembersField";
import "./MatchForm.css";
import LinkButton from "../LinkButton";
import { Flex } from "@primer/components";

const shouldEnableRankField = (season: Season, openQueue: boolean, role?: HeroRole | null) => {
  if (role) {
    return true;
  }
  return openQueue;
};

const roleForHero = (hero: Hero): HeroRole => {
  for (const role of HeroRoles) {
    if (HeroesByRole[role].includes(hero)) {
      return role;
    }
  }
  // Shouldn't reach this
  return "Damage";
};

const dateTimeStrFrom = (date: Date) => {
  const year = date.getFullYear();

  const month = date.getMonth() + 1;
  let monthStr = month.toString();
  if (month <= 9) {
    monthStr = `0${month}`;
  }

  const day = date.getDate();
  let dayStr = day.toString();
  if (day <= 9) {
    dayStr = `0${day}`;
  }

  const hour = date.getHours();
  let hourStr = hour.toString();
  if (hour <= 9) {
    hourStr = `0${hour}`;
  }

  const minute = date.getMinutes();
  let minuteStr = minute.toString();
  if (minute <= 9) {
    minuteStr = `0${minute}`;
  }

  return `${year}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
};

interface Props {
  joinedVoice?: boolean;
  playOfTheGame?: boolean;
  allyThrower?: boolean;
  allyLeaver?: boolean;
  allyCheater?: boolean;
  enemyThrower?: boolean;
  enemyLeaver?: boolean;
  enemyCheater?: boolean;
  playedAt?: Date;
  dayOfWeek?: DayOfWeek;
  timeOfDay?: TimeOfDay;
  isPlacement?: boolean;
  isLastPlacement?: boolean;
  id?: string;
  comment?: string;
  map?: Map;
  season: Season;
  openQueue: boolean;
  priorMatches: Match[];
  role?: HeroRole | null;
  rank?: number;
  accountID: string;
  result?: MatchResult;
  onUpdate?: (id?: string) => void;
  onCreate?: (id?: string) => void;
  theme: string;
  heroes?: string;
  group?: string;
  latestGroup?: string | null;
  groupSize?: number;
}

interface MatchValidityProps {
  group?: string;
  season: Season;
  groupSize: number;
  rank?: number;
  result?: MatchResult;
  isPlacement?: boolean;
  role: HeroRole | null;
}

const minRank = 0;
const maxRank = 5000;
const maxGroupSize = 6;

const isMatchValid = ({
  rank,
  isPlacement,
  result,
  role,
  season,
  groupSize,
  group
}: MatchValidityProps) => {
  if (typeof rank !== "number" || rank < minRank || rank > maxRank) {
    if (isPlacement && !result) {
      return false;
    }

    if (!isPlacement) {
      return false;
    }
  }

  if (typeof role !== "string" || role.length < 1) {
    return false;
  }

  if (groupSize && groupSize > maxGroupSize) {
    return false;
  }

  if (group && group.split(",").length > maxGroupSize) {
    return false;
  }

  return true;
};

const explodeHeroesString = (heroesStr: string) => {
  return heroesStr
    .split(",")
    .map(str => str.trim())
    .filter(str => str && str.length > 0);
};

type RoleCounts = {
  [role in HeroRole]?: number;
};

type PlayTimes = {
  initialPlayedAt?: Date;
  initialDayOfWeek?: DayOfWeek;
  initialTimeOfDay?: TimeOfDay;
};

const getPlayTimes = (props: Props): PlayTimes => {
  let playedAt = props.playedAt;
  let dayOfWeek = props.dayOfWeek;
  let timeOfDay = props.timeOfDay;
  if (!props.id && !playedAt) {
    playedAt = new Date();
    dayOfWeek = DayTimeApproximator.dayOfWeek(playedAt);
    timeOfDay = DayTimeApproximator.timeOfDay(playedAt);
  }
  return {
    initialPlayedAt: playedAt,
    initialDayOfWeek: dayOfWeek,
    initialTimeOfDay: timeOfDay
  };
};

type PlacementStatus = {
  initialIsPlacement: boolean;
  initialIsLastPlacement: boolean;
};

const getPlacementStatus = (props: Props): PlacementStatus => {
  let isPlacement = props.isPlacement;
  let isLastPlacement = props.isLastPlacement;
  if (typeof isPlacement !== "boolean") {
    const priorPlacements = props.priorMatches.filter(m => m.isPlacement);
    if (props.openQueue) {
      // no role queue
      isPlacement = priorPlacements.length < 10;
      isLastPlacement = priorPlacements.length === 9;
    } else {
      // role queue
      const placementCountsByRole: RoleCounts = {};
      for (const placement of priorPlacements) {
        if (placement.role) {
          placementCountsByRole[placement.role] =
            (placementCountsByRole[placement.role] || 0) + 1;
        }
      }
      // definitely logging a placement match because haven't finished placements for any role
      isPlacement = Object.values(placementCountsByRole).every(
        count => typeof count === "number" && count < 5
      );
    }
  }
  return {
    initialIsLastPlacement: isLastPlacement || false,
    initialIsPlacement: isPlacement
  };
};

const MatchForm = (props: Props) => {
  const placementMatchResultField = useRef<HTMLSelectElement | null>();
  const matchRankField = useRef<HTMLInputElement | null>();

  const { initialPlayedAt, initialTimeOfDay, initialDayOfWeek } = getPlayTimes(
    props
  );
  const { initialIsLastPlacement, initialIsPlacement } = getPlacementStatus(
    props
  );

  const [playedAt, setPlayedAt] = useState(initialPlayedAt);
  const [timeOfDay, setTimeOfDay] = useState(initialTimeOfDay);
  const [dayOfWeek, setDayOfWeek] = useState(initialDayOfWeek);
  const [isPlacement, setIsPlacement] = useState(initialIsPlacement);
  const [isLastPlacement, setIsLastPlacement] = useState(
    initialIsLastPlacement
  );
  const [enableRankField, setEnableRankField] = useState(
    shouldEnableRankField(props.season, props.openQueue, props.role)
  );
  const [rank, setRank] = useState<number | undefined>(
    props.id ? props.rank : undefined
  );
  const [latestRank, setLatestRank] = useState<number | undefined>(props.rank);
  const [result, setResult] = useState<MatchResult | undefined>(props.result);
  const [comment, setComment] = useState(props.comment || "");
  const [map, setMap] = useState<Map | undefined>(props.map);
  const [group, setGroup] = useState(props.group || "");
  const [groupSize, setGroupSize] = useState(props.groupSize || 1);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [heroes, setHeroes] = useState(props.heroes || "");
  const [role, setRole] = useState<HeroRole | null>(props.role || null);
  const [joinedVoice, setJoinedVoice] = useState(
    typeof props.joinedVoice === "boolean" ? props.joinedVoice : false
  );
  const [playOfTheGame, setPlayOfTheGame] = useState(
    typeof props.playOfTheGame === "boolean" ? props.playOfTheGame : false
  );
  const [allyThrower, setAllyThrower] = useState(
    typeof props.allyThrower === "boolean" ? props.allyThrower : false
  );
  const [allyLeaver, setAllyLeaver] = useState(
    typeof props.allyLeaver === "boolean" ? props.allyLeaver : false
  );
  const [allyCheater, setAllyCheater] = useState(
    typeof props.allyCheater === "boolean" ? props.allyCheater : false
  );
  const [enemyThrower, setEnemyThrower] = useState(
    typeof props.enemyThrower === "boolean" ? props.enemyThrower : false
  );
  const [enemyLeaver, setEnemyLeaver] = useState(
    typeof props.enemyLeaver === "boolean" ? props.enemyLeaver : false
  );
  const [enemyCheater, setEnemyCheater] = useState(
    typeof props.enemyCheater === "boolean" ? props.enemyCheater : false
  );
  const [isValid, setIsValid] = useState(
    isMatchValid({
      rank,
      isPlacement,
      result,
      role,
      season: props.season,
      groupSize,
      group
    })
  );

  const refreshGroupMembers = async () => {
    const { accountID, season } = props;

    const members = await Account.findAllGroupMembers(accountID, season);
    setGroupMembers(members);
  };

  const onSubmit = async () => {
    if (!isValid) {
      return;
    }

    const data: MatchData = {
      comment,
      map,
      group,
      groupSize,
      accountID: props.accountID,
      heroes,
      playedAt,
      allyThrower,
      allyLeaver,
      allyCheater,
      enemyThrower,
      enemyLeaver,
      enemyCheater,
      playOfTheGame,
      joinedVoice,
      season: props.season.number,
      openQueue: props.openQueue,
      role: role || undefined,
      isPlacement,
      _id: props.id,
      result
    };

    if (typeof rank === "number") {
      data.rank = rank;
    }

    const match = new Match(data);
    await match.save();

    if (props.id) {
      if (props.onUpdate) {
        props.onUpdate(match._id);
      }
    } else if (props.onCreate) {
      props.onCreate(match._id);
    }
  };

  const onFormFieldUpdate = () => {
    setIsValid(
      isMatchValid({
        rank,
        isPlacement,
        result,
        role,
        season: props.season,
        groupSize,
        group
      })
    );
  };

  const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
    onFormFieldUpdate();
  };

  const onMapChange = (map?: Map | null) => {
    if (map) {
      setMap(map);
    } else {
      setMap(undefined);
    }
    onFormFieldUpdate();
  };

  const onRankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rankStr = event.target.value;
    if (rankStr.length > 0) {
      setRank(parseInt(rankStr, 10));
    } else {
      setRank(undefined);
    }
    onFormFieldUpdate();
  };

  const onResultChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newResult = event.target.value;
    if (newResult.length > 0) {
      setResult(newResult as MatchResult);
    } else {
      setResult(undefined);
    }
    onFormFieldUpdate();
  };

  const onGroupChange = (group: string, groupSize: number) => {
    setGroup(group);
    setGroupSize(groupSize);
    onFormFieldUpdate();
  };

  const onGroupSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let groupSizeStr = event.target.value;
    if (groupSizeStr.length > 0) {
      setGroupSize(parseInt(groupSizeStr, 10));
    } else {
      setGroupSize(1);
    }
    onFormFieldUpdate();
  };

  const onPlayedAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let playedAtStr = event.target.value;
    if (playedAtStr.length > 0) {
      setPlayedAt(new Date(playedAtStr));
      setDayOfWeek(DayTimeApproximator.dayOfWeek(playedAtStr));
      setTimeOfDay(DayTimeApproximator.timeOfDay(playedAtStr));
    } else {
      setPlayedAt(undefined);
      setDayOfWeek(undefined);
      setTimeOfDay(undefined);
    }
    onFormFieldUpdate();
  };

  const onDayOfWeekTimeOfDayChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const dayOfWeekTimeOfDay = event.target.value;
    if (dayOfWeekTimeOfDay.indexOf("-") < 0) {
      setDayOfWeek(undefined);
      setTimeOfDay(undefined);
      onFormFieldUpdate();
      return;
    }

    const parts = dayOfWeekTimeOfDay.split("-");

    if (dayOfWeek !== parts[0] || timeOfDay !== parts[1]) {
      setPlayedAt(undefined);
    }
    setDayOfWeek(parts[0] as DayOfWeek);
    setTimeOfDay(parts[1] as TimeOfDay);
    onFormFieldUpdate();
  };

  const changeHeroesString = (
    heroesStr: string,
    hero: Hero,
    isSelected: boolean
  ) => {
    const heroes = explodeHeroesString(heroesStr);
    const heroIndex = heroes.indexOf(hero);
    if (isSelected && heroIndex < 0) {
      heroes.push(hero);
    }
    if (!isSelected && heroIndex > -1) {
      delete heroes[heroIndex];
    }
    return heroes.join(", ");
  };

  const getPriorPlacementsInRole = (role: HeroRole) => {
    return props.priorMatches.filter(m => m.role === role && m.isPlacement);
  };

  const getLatestRankInRole = (role: HeroRole) => {
    const priorMatchesInRole = props.priorMatches.filter(
      m => m.role === role && typeof m.rank === "number"
    );
    const latestMatchInRole = priorMatchesInRole[priorMatchesInRole.length - 1];

    if (latestMatchInRole) {
      return latestMatchInRole.rank;
    }
  };

  const onRoleChange = (newRole: HeroRole) => {
    const { openQueue } = props;
    const heroesInRole = HeroesByRole[newRole];
    const oldSelectedHeroes = explodeHeroesString(heroes);
    const selectedHeroes = oldSelectedHeroes.filter(
      hero => heroesInRole.indexOf(hero as Hero) > -1
    );
    const priorPlacementMatchesInRole = getPriorPlacementsInRole(newRole);

    setRole(newRole);
    setHeroes(selectedHeroes.join(", "));

    if (!openQueue) {
      if (priorPlacementMatchesInRole.length < 5) {
        setIsPlacement(true);
        setIsLastPlacement(priorPlacementMatchesInRole.length === 4);
      } else {
        setIsPlacement(false);
        setIsLastPlacement(false);
      }

      setLatestRank(getLatestRankInRole(newRole));
      setEnableRankField(typeof newRole === "string" && newRole.length > 0);
    } else {
      setEnableRankField(true);
    }
    onFormFieldUpdate();
  };

  const onHeroChange = (hero: Hero, isSelected: boolean) => {
    const newHeroes = changeHeroesString(heroes, hero, isSelected);
    setHeroes(newHeroes);
    const { openQueue } = props;

    if (!openQueue) {
      if (isSelected && (typeof role !== "string" || role.length < 1)) {
        const newRole = roleForHero(hero);
        setRole(newRole);

        const priorPlacementMatchesInRole = getPriorPlacementsInRole(newRole);
        if (priorPlacementMatchesInRole.length < 5) {
          setIsPlacement(true);
          setIsLastPlacement(priorPlacementMatchesInRole.length === 4);
        } else {
          setIsPlacement(false);
          setIsLastPlacement(false);
        }

        const newLatestRank = getLatestRankInRole(newRole);
        if (typeof latestRank === "number") {
          setLatestRank(newLatestRank);
        }
      } else if (!isSelected && newHeroes.length < 1) {
        setRole(null);
        setIsLastPlacement(false);
        setLatestRank(undefined);
      }
    } else {
      setRole(null);
    }
    onFormFieldUpdate();
  };

  const onAllyThrowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllyThrower(event.target.checked);
    onFormFieldUpdate();
  };

  const onAllyLeaverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllyLeaver(event.target.checked);
    onFormFieldUpdate();
  };

  const onAllyCheaterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllyCheater(event.target.checked);
    onFormFieldUpdate();
  };

  const onEnemyThrowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnemyThrower(event.target.checked);
    onFormFieldUpdate();
  };

  const onEnemyLeaverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnemyLeaver(event.target.checked);
    onFormFieldUpdate();
  };

  const onEnemyCheaterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnemyCheater(event.target.checked);
    onFormFieldUpdate();
  };

  const onPlayOfTheGameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlayOfTheGame(event.target.checked);
    onFormFieldUpdate();
  };

  const onJoinedVoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinedVoice(event.target.checked);
    onFormFieldUpdate();
  };

  const { season, latestGroup, theme, accountID, openQueue } = props;
  const dayOfWeekTimeOfDay = `${dayOfWeek}-${timeOfDay}`;

  useEffect(() => {
    setEnableRankField(shouldEnableRankField(season, openQueue, role));
    refreshGroupMembers();

    setIsValid(
      isMatchValid({
        rank,
        role,
        isPlacement,
        season,
        groupSize,
        group,
        result
      })
    );
  }, [
    accountID,
    rank,
    role,
    isPlacement,
    season,
    groupSize,
    group,
    result,
    latestRank,
    isLastPlacement,
    comment,
    map,
    heroes,
    playedAt,
    playOfTheGame,
    joinedVoice,
    allyThrower,
    allyLeaver,
    allyCheater,
    enemyThrower,
    enemyLeaver,
    enemyCheater
  ]);

  useEffect(() => {
    // Already have new SR and match result, no need to focus the field
    if (result && typeof rank === "number") {
      return;
    }

    // New SR field is shown and disabled, can't focus it
    if (!isPlacement && !enableRankField) {
      return;
    }

    // Role selection is required first
    if (!openQueue && !role) {
      return;
    }

    if (placementMatchResultField.current) {
      placementMatchResultField.current.focus();
    } else if (matchRankField.current) {
      matchRankField.current.focus();
    }
  }, [
    placementMatchResultField,
    matchRankField,
    result,
    rank,
    enableRankField,
    season,
    role,
    isPlacement
  ]);

  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        onSubmit();
      }}
      className="mb-4"
    >
      <div className="clearfix">
        <div className="col-md-12 col-lg-6 float-left pr-3-lg">
          {!openQueue && (
            <div className="form-group mt-0">
              <span className="f3 mr-4">Role played:</span>
              <RoleSelect
                selectedRole={role}
                theme={theme}
                onChange={onRoleChange}
              />
            </div>
          )}
          <div className="d-flex-md mb-2 flex-items-center-md flex-justify-between-md">
            <div className="form-group my-0 d-flex flex-items-center">
              {isPlacement ? (
                <label htmlFor="match-result" className="label-lg mr-2 no-wrap">
                  Placement match result:
                </label>
              ) : (
                <label htmlFor="match-rank" className="label-lg mr-2 no-wrap">
                  New{" "}
                  <span
                    className="tooltipped tooltipped-n"
                    aria-label="Skill Rating"
                  >
                    SR
                  </span>
                  :
                </label>
              )}
              {isPlacement ? (
                <select
                  className="form-select select-lg"
                  value={result}
                  required
                  autoFocus={openQueue}
                  id="match-result"
                  onChange={onResultChange}
                  ref={el => (placementMatchResultField.current = el)}
                >
                  <option value=""></option>
                  <option value="win">Win</option>
                  <option value="loss">Loss</option>
                  <option value="draw">Draw</option>
                </select>
              ) : (
                <input
                  id="match-rank"
                  type="number"
                  required
                  autoFocus={openQueue}
                  ref={el => (matchRankField.current = el)}
                  className="form-control sr-field"
                  value={rank || ""}
                  onChange={onRankChange}
                  placeholder={
                    typeof latestRank === "number" ? latestRank.toString() : ""
                  }
                  disabled={!enableRankField}
                />
              )}
            </div>
            <dl className="form-group my-0 ml-4">
              <dt>
                <label htmlFor="match-map">
                  <span className="ion ion-md-pin mr-1" />
                  Map:
                </label>
              </dt>
              <dd>
                <MapSelect map={map} onChange={onMapChange} />
              </dd>
            </dl>
          </div>
          {isPlacement && isLastPlacement && (
            <dl className="form-group mt-0">
              <dt>
                <label htmlFor="match-rank" className="sr-field-label">
                  {role && !openQueue
                    ? `Where did you place as a ${role}?`
                    : "Where did you place?"}
                </label>
              </dt>
              <dd>
                <input
                  id="match-rank"
                  type="number"
                  className="form-control sr-field"
                  value={rank}
                  onChange={onRankChange}
                  placeholder={latestRank ? latestRank.toString() : ""}
                />
              </dd>
            </dl>
          )}
          <dl className="form-group mt-0">
            <dt>
              <label htmlFor="match-comment">
                <span className="ion ion-md-list mr-1" />
                Comment:
              </label>
            </dt>
            <dd>
              <input
                id="match-comment"
                type="text"
                className="form-control width-full"
                value={comment}
                onChange={onCommentChange}
                placeholder="Notes about this game"
              />
            </dd>
          </dl>
          <fieldset className="Box pt-2 pb-3 px-3">
            <legend className="h5">
              <span className="ion ion-md-people mr-1" />
              Your group
            </legend>
            <GroupMembersField
              group={group}
              groupMembers={groupMembers}
              onGroupChange={onGroupChange}
              latestGroup={latestGroup}
            />
            <dl className="form-group mb-0">
              <dt>
                <label htmlFor="match-group-size">
                  How many people did you queue with?
                </label>
              </dt>
              <dd>
                <select
                  id="match-group-size"
                  className="form-select"
                  value={groupSize}
                  onChange={onGroupSizeChange}
                >
                  <option value="1">Nobody (solo queue)</option>
                  <option value="2">1 other person</option>
                  <option value="3">2 other people</option>
                  <option value="4">3 other people</option>
                  <option value="5">4 other people</option>
                  <option value="6">5 other people (6-stack)</option>
                </select>
              </dd>
            </dl>
          </fieldset>
          <div className="d-flex">
            <div className="form-checkbox mr-4">
              <label>
                <input
                  type="checkbox"
                  checked={playOfTheGame}
                  onChange={onPlayOfTheGameChange}
                />
                <span className="ion ion-md-trophy mr-1" />
                Play of the game
              </label>
              <p className="note">Did you get play of the game?</p>
            </div>
            <div className="form-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={joinedVoice}
                  onChange={onJoinedVoiceChange}
                />
                <span className="ion ion-md-mic mr-1" />
                Joined voice chat
              </label>
              <p className="note">Did you join voice chat?</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="text-bold">
              Did anyone try to sabotage the game?
            </div>
            <div className="float-left col-lg-4 col-md-5">
              <div className="form-checkbox mr-4 mb-0 mt-1">
                <label className="text-normal no-wrap text-ally">
                  <input
                    type="checkbox"
                    checked={allyThrower}
                    onChange={onAllyThrowerChange}
                  />
                  Thrower on my team
                </label>
              </div>
              <div className="form-checkbox mr-4 my-1">
                <label className="text-normal no-wrap text-ally">
                  <input
                    type="checkbox"
                    checked={allyLeaver}
                    onChange={onAllyLeaverChange}
                  />
                  Leaver on my team
                </label>
              </div>
              <div className="form-checkbox mr-4 my-1">
                <label className="text-normal no-wrap text-ally">
                  <input
                    type="checkbox"
                    checked={allyCheater}
                    onChange={onAllyCheaterChange}
                  />
                  Cheater on my team
                </label>
              </div>
            </div>
            <div className="float-left col-lg-5 col-md-7">
              <div className="form-checkbox mb-0 mt-1">
                <label className="text-normal no-wrap text-enemy">
                  <input
                    type="checkbox"
                    checked={enemyThrower}
                    onChange={onEnemyThrowerChange}
                  />
                  Thrower on the enemy team
                </label>
              </div>
              <div className="form-checkbox my-1">
                <label className="text-normal no-wrap text-enemy">
                  <input
                    type="checkbox"
                    checked={enemyLeaver}
                    onChange={onEnemyLeaverChange}
                  />
                  Leaver on the enemy team
                </label>
              </div>
              <div className="form-checkbox my-1">
                <label className="text-normal no-wrap text-enemy">
                  <input
                    type="checkbox"
                    checked={enemyCheater}
                    onChange={onEnemyCheaterChange}
                  />
                  Cheater on the enemy team
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6 float-right pl-3-lg">
          <dl className="form-group my-0">
            <dt className="text-bold">Heroes played:</dt>
            <dd>
              <HeroSelect
                role={role}
                theme={theme}
                heroes={heroes}
                season={season}
                onToggle={onHeroChange}
              />
            </dd>
          </dl>
          <dl className="form-group mt-0">
            <dt>
              <label className="f6" htmlFor="match-played-at">
                <span className="ion ion-md-time mr-1" />
                When did you play?
              </label>
            </dt>
            <dd>
              <input
                id="match-played-at"
                type="datetime-local"
                className="input-sm form-control datetime-local-control"
                value={playedAt ? dateTimeStrFrom(playedAt) : ""}
                onChange={onPlayedAtChange}
              />
              {dayOfWeek && timeOfDay ? (
                <span className="d-inline-block ml-2">
                  <DayOfWeekEmoji dayOfWeek={dayOfWeek} />{" "}
                  <TimeOfDayEmoji timeOfDay={timeOfDay} />
                </span>
              ) : null}
              <select
                className="input-sm form-select ml-2"
                value={dayOfWeekTimeOfDay}
                aria-label="When did you generally play the game?"
                onChange={onDayOfWeekTimeOfDayChange}
              >
                <option value="">Choose a day and time</option>
                <option value="weekday-morning">Weekday morning</option>
                <option value="weekday-afternoon">Weekday afternoon</option>
                <option value="weekday-evening">Weekday evening</option>
                <option value="weekday-night">Weekday night</option>
                <option value="weekend-morning">Weekend morning</option>
                <option value="weekend-afternoon">Weekend afternoon</option>
                <option value="weekend-evening">Weekend evening</option>
                <option value="weekend-night">Weekend night</option>
              </select>
            </dd>
          </dl>
        </div>
      </div>
      <Flex alignItems="center" justifyContent="flex-end">
        {props.id && props.onUpdate && (
          <LinkButton mr={3} onClick={() => props.onUpdate && props.onUpdate()}>
            Cancel edit
          </LinkButton>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-large"
          disabled={!isValid}
        >
          Save match
        </button>
      </Flex>
    </form>
  );
};

export default MatchForm;
