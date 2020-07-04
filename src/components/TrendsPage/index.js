import React, { Component } from "react";
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
import {Flex} from "@primer/components";
import "./TrendsPage.css";

class TrendsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  refreshAccount = () => {
    const { accountID } = this.props;

    Account.find(accountID).then(account => {
      this.setState(prevState => ({ account }));
    });
  };

  refreshMatches = () => {
    const { accountID, season } = this.props;

    Match.findAll(accountID, season).then(matches => {
      this.setState(prevState => ({ matches }));
    });
  };

  chartFontColor = () => {
    if (this.props.theme === "dark") {
      return Color.darkThemeText;
    }

    return Color.lightThemeText;
  };

  componentDidMount() {
    this.refreshMatches();
    this.refreshAccount();
    defaults.global.defaultFontColor = this.chartFontColor();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.season !== this.props.season ||
      prevProps.accountID !== this.props.accountID
    ) {
      this.refreshMatches();
    }
    if (prevProps.accountID !== this.props.accountID) {
      this.refreshAccount();
    }
  }

  anyMatchesJoinedVoice = () => {
    return this.state.matches.filter(match => match.joinedVoice).length > 0;
  };

  anyMatchesWithHeroes = () => {
    return (
      this.state.matches.filter(match => match.heroList.length > 0).length > 0
    );
  };

  showDayTimeChart = () => {
    return (
      this.state.matches.filter(match => match.dayOfWeek && match.timeOfDay)
        .length > 0
    );
  };

  showBadActorsTimeChart = () => {
    return (
      this.state.matches.filter(match => {
        return match.dayOfWeek && match.timeOfDay && match.hasBadActor();
      }).length > 0
    );
  };

  showMapChart = () => {
    return this.state.matches.filter(match => match.map).length > 0;
  };

  anyBadActorsInMatches = () => {
    return this.state.matches.filter(match => match.hasBadActor()).length > 0;
  };

  render() {
    const { matches, account } = this.state;
    const { season, theme } = this.props;

    if (!matches || !account) {
      return <LoadingPage />;
    }

    if (matches.length < 1) {
      return (
        <div className="container mb-4 layout-children-container">
          <Blankslate>
            <h3 className="mb-2 h3">No match history</h3>
            <p>
              No matches have been logged in season {season} for{" "}
              {account.battletag}.
            </p>
          </Blankslate>
        </div>
      );
    }

    const showHeroesCharts = this.anyMatchesWithHeroes();
    const showVoiceCharts = this.anyMatchesJoinedVoice();
    const showBadActorChart = this.anyBadActorsInMatches();
    const showBadActorsTimeChart = this.showBadActorsTimeChart();

    return (
      <div className="container mb-4 layout-children-container">
        <div className="clearfix">
          <div
            className={
              showBadActorChart ? "col-md-5 float-md-left" : "col-md-5 mx-auto"
            }
          >
            <WinLossChart season={season} matches={matches} />
          </div>
        </div>
        <HorizontalRule />
        <StreaksChart season={season} matches={matches} />
        {this.showMapChart() ? (
          <div>
            <HorizontalRule />
            <MapChart season={season} matches={matches} />
            <HorizontalRule />
            <div className="clearfix">
              <div className="col-md-6 mx-auto">
                <MapTypeChart season={season} matches={matches} />
              </div>
            </div>
          </div>
        ) : null}
        <GroupSizeChart theme={theme} season={season} matches={matches} />
        {showHeroesCharts || showVoiceCharts ? (
          <div>
            {showHeroesCharts ? (
              <div>
                <HorizontalRule />
                <HeroRatiosChart season={season} matches={matches} />
              </div>
            ) : null}
            <HorizontalRule />
            <div className="clearfix">
              {showHeroesCharts ? (
                <div
                  className={
                    showVoiceCharts
                      ? "col-md-7 float-md-left"
                      : "col-md-7 mx-auto"
                  }
                >
                  <RoleChart season={season} theme={theme} matches={matches} />
                </div>
              ) : null}
              {showVoiceCharts ? (
                <div
                  className={
                    showHeroesCharts
                      ? "col-md-5 float-md-left"
                      : "col-md-5 mx-auto"
                  }
                >
                  <VoiceChatChart
                    season={season}
                    theme={theme}
                    matches={matches}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {this.showDayTimeChart() && (
          <div>
            <HorizontalRule />
            <DayTimeChart season={season} matches={matches} />
          </div>
        )}
        {(showBadActorChart || showBadActorsTimeChart) && (
          <Flex justifyContent="space-between" alignItems="center">
            {showBadActorChart && (
              <BadActorChart season={season} matches={matches} />
            )}
            {showBadActorsTimeChart && (
              <BadActorsTimeChart season={season} matches={matches} />
            )}
          </Flex>
        )}
      </div>
    );
  }
}

export default TrendsPage;
