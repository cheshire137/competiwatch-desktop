import React, { useEffect, useState } from "react";
import { defaults } from "react-chartjs-2";
import LoadingPage from "../LoadingPage";
import WinLossChart from "../Charts/WinLossChart";
import BadActorChart from "../Charts/BadActorChart";
import StreaksChart from "../Charts/StreaksChart";
import GroupSizeChart from "../Charts/GroupSizeChart";
import HeroRatiosChart from "../Charts/HeroRatiosChart";
import DayTimeChart from "../Charts/DayTimeChart";
import BadActorsTimeChart from "../Charts/BadActorsTimeChart";
import VoiceChatChart from "../Charts/VoiceChatChart";
import RoleChart from "../Charts/RoleChart";
import MapChart from "../Charts/MapChart";
import MapTypeChart from "../Charts/MapTypeChart";
import Match from "../../models/Match";
import Account from "../../models/Account";
import Color from "../../models/Color";
import Blankslate from "../Blankslate";
import HorizontalRule from "../HorizontalRule";
import { Flex, Heading } from "@primer/components";
import "./TrendsPage.css";
import Season from "../../models/Season";

interface Props {
  account: Account;
  openQueue: boolean;
  season: Season;
  theme: string;
}

const TrendsPage = ({
  account,
  openQueue,
  season,
  theme
}: Props) => {
  const [matches, setMatches] = useState<Array<Match> | null>(null);

  useEffect(() => {
    async function getMatches() {
      const m = await Match.findAll(account._id, season, openQueue);
      setMatches(m);
    }

    getMatches();
  }, [account._id, season && season.number, openQueue]);

  if (!matches) {
    return <LoadingPage />;
  }

  const chartFontColor = () => {
    if (theme === "dark") {
      return Color.darkThemeText;
    }
    return Color.lightThemeText;
  };

  defaults.global.defaultFontColor = chartFontColor();

  const anyMatchesJoinedVoice = () => {
    return matches.filter(match => match.joinedVoice).length > 0;
  };

  const anyMatchesWithHeroes = () => {
    return (
      matches.filter(match => match.heroList.length > 0).length > 0
    );
  };

  const showDayTimeChart = () => {
    return (
      matches.filter(match => match.dayOfWeek && match.timeOfDay)
        .length > 0
    );
  };

  const shouldShowBadActorsTimeChart = () => {
    return (
      matches.filter(match => {
        return match.dayOfWeek && match.timeOfDay && match.hasBadActor();
      }).length > 0
    );
  };

  const showMapChart = () => {
    return matches.filter(match => match.map).length > 0;
  };

  const anyBadActorsInMatches = () => {
    return matches.filter(match => match.hasBadActor()).length > 0;
  };

  if (!matches || !account) {
    return <LoadingPage />;
  }

  if (matches.length < 1) {
    return (
      <div className="container mb-4 layout-children-container">
        <Blankslate>
          <Heading mb={2} as="h3" fontSize={3}>No match history</Heading>
          <p>
            No matches have been logged in season {season.number} ({openQueue ? 'open' : 'role'} queue) for{" "}
            {account.battletag}.
          </p>
        </Blankslate>
      </div>
    );
  }

  const showHeroesCharts = anyMatchesWithHeroes();
  const showVoiceCharts = anyMatchesJoinedVoice();
  const showBadActorChart = anyBadActorsInMatches();
  const showBadActorsTimeChart = shouldShowBadActorsTimeChart();

  return (
    <div className="container mb-4 layout-children-container">
      <div className="clearfix">
        <div
          className={
            showBadActorChart ? "col-md-5 float-md-left" : "col-md-5 mx-auto"
          }
        >
          <WinLossChart season={season.number} matches={matches} />
        </div>
      </div>
      <HorizontalRule />
      <StreaksChart season={season.number} matches={matches} />
      {showMapChart() ? (
        <div>
          <HorizontalRule />
          <MapChart season={season.number} matches={matches} />
          <HorizontalRule />
          <div className="clearfix">
            <div className="col-md-6 mx-auto">
              <MapTypeChart season={season.number} matches={matches} />
            </div>
          </div>
        </div>
      ) : null}
      <GroupSizeChart theme={theme} season={season.number} matches={matches} />
      {showHeroesCharts || showVoiceCharts ? (
        <div>
          {showHeroesCharts && (
            <div>
              <HorizontalRule />
              <HeroRatiosChart season={season.number} matches={matches} />
            </div>
          )}
          <HorizontalRule />
          <div className="clearfix">
            {showHeroesCharts && (
              <div
                className={
                  showVoiceCharts
                    ? "col-md-7 float-md-left"
                    : "col-md-7 mx-auto"
                }
              >
                <RoleChart season={season.number} theme={theme} matches={matches} />
              </div>
            )}
            {showVoiceCharts && (
              <div
                className={
                  showHeroesCharts
                    ? "col-md-5 float-md-left"
                    : "col-md-5 mx-auto"
                }
              >
                <VoiceChatChart
                  season={season.number}
                  matches={matches}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
      {showDayTimeChart() && (
        <>
          <HorizontalRule />
          <DayTimeChart season={season.number} matches={matches} />
        </>
      )}
      {(showBadActorChart || showBadActorsTimeChart) && (
        <Flex justifyContent="space-between" alignItems="center">
          {showBadActorChart && (
            <BadActorChart season={season.number} matches={matches} />
          )}
          {showBadActorsTimeChart && (
            <BadActorsTimeChart season={season.number} matches={matches} />
          )}
        </Flex>
      )}
    </div>
  );
};

export default TrendsPage;
