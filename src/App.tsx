import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Account from "./models/Account";
import Match from "./models/Match";
import Season from "./models/Season";
import Setting from "./models/Setting";
import Settings from "./models/Setting";
import AppMenu from "./models/AppMenu";
import CsvExporter from "./models/CsvExporter";
import FileUtil from "./models/FileUtil";
import AccountsPage from "./components/AccountsPage";
import MatchesPage from "./components/MatchesPage";
import HelpPage from "./components/HelpPage";
import MatchCreatePage from "./components/MatchCreatePage";
import TrendsPage from "./components/TrendsPage";
import AboutPage from "./components/AboutPage";
import ImportPage from "./components/ImportPage";
import MatchEditPage from "./components/MatchEditPage";
import SettingsPage from "./components/SettingsPage";
import LayoutContainer from "./components/LayoutContainer";

import "./ionicons.min.css";
import "./App.css";
import { setTitle, showSaveDialog } from "./utils/electronUtils";
import getAppTheme from "./utils/getAppTheme";
import { ThemeProvider } from "styled-components";
import LoadingPage from "./components/LoadingPage";

const isNighttime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  return hours >= 20 || hours <= 5;
};

function getTitle(
  activePage: string,
  activeSeason?: Season | null,
  activeAccount?: Account | null
) {
  const isSeasonRelevant = [
    "matches",
    "log-match",
    "trends",
    "edit-match",
    "import"
  ].includes(activePage);
  const isAccountRelevant = [
    "matches",
    "log-match",
    "trends",
    "edit-match",
    "import"
  ].includes(activePage);
  let titleParts = [];

  if (activePage === "matches") {
    titleParts.push("Matches");
  } else if (activePage === "log-match") {
    titleParts.push("Log a Match");
  } else if (activePage === "trends") {
    titleParts.push("Trends");
  } else if (activePage === "edit-match") {
    titleParts.push("Edit Match");
  } else if (activePage === "import") {
    titleParts.push("Import Matches");
  } else if (activePage === "about") {
    titleParts.push("About");
  } else if (activePage === "settings") {
    titleParts.push("Settings");
  } else if (activePage === "accounts") {
    titleParts.push("Accounts");
  } else if (activePage === "help") {
    titleParts.push("Help");
  }

  if (activeSeason && isSeasonRelevant) {
    titleParts.push(`Season ${activeSeason.number}`);
  }

  if (activeAccount && isAccountRelevant) {
    titleParts.push(activeAccount.battletag);
  }

  return titleParts.join(" / ");
}

const App = () => {
  const [latestRank, setLatestRank] = useState(2500);
  const themeInterval = useRef<number | null>(null);
  const [latestSeason, setLatestSeason] = useState<Season | null>(null);
  const [scrollToMatchID, setScrollToMatchID] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [seasons, setSeasons] = useState<Array<Season>>([]);
  const [activeMatchID, setActiveMatchID] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string>("accounts");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [latestGroup, setLatestGroup] = useState<string | null>(null);
  const [latestSeasonTotalMatches, setLatestSeasonTotalMatches] = useState<
    number
  >(-1);
  const [openQueue, setOpenQueue] = useState<boolean | null>(null);

  const activateDefaultAccount = () => {
    if (!settings || !settings.defaultAccountID) {
      return;
    }
    const defaultAccount = accounts.filter(
      a => a._id === settings.defaultAccountID
    )[0];
    if (defaultAccount) {
      setActiveAccount(defaultAccount);
      setActivePage("matches");
    }
  };

  async function loadSeasons() {
    const allSeasons = await Season.findAll();
    const season = allSeasons[0];
    const totalMatches = await season.totalMatches();

    setSeasons(allSeasons);
    if (latestSeason === null || season.number > latestSeason.number) {
      setLatestSeason(season);
    }
    setLatestSeasonTotalMatches(totalMatches);
    setActiveSeason(season);
    changeActiveSeason(season);
  }

  async function loadSettings() {
    const loadedSettings = await Setting.load();
    setSettings(loadedSettings);
  }

  async function refreshAccounts() {
    const allAccounts = await Account.findAll();
    setAccounts(allAccounts);
  }

  const changeOpenQueue = (newValue: boolean) => {
    setOpenQueue(newValue);
  };

  const changeActiveSeason = (newSeason: Season) => {
    setActiveSeason(newSeason);
    if (activeMatchID) {
      setActiveMatchID(null);
    }
    if (activePage === "edit-match" || activePage === "log-match") {
      setActivePage("matches");
    }
    if (latestSeason === null || newSeason.number > latestSeason.number) {
      setLatestSeason(newSeason);
    }
    if (Season.onlyOpenQueue(newSeason.number)) {
      changeOpenQueue(true);
    } else if (Season.onlyRoleQueue(newSeason.number)) {
      changeOpenQueue(false);
    } else if (typeof openQueue !== "boolean") {
      changeOpenQueue(false);
    }
  };

  const exportSeasonTo = async (path: string) => {
    if (!activeAccount || !activeSeason || !activeAccount.battletag) {
      return;
    }

    const exporter = new CsvExporter(
      path,
      activeSeason,
      activeAccount._id,
      activeAccount.battletag
    );
    await exporter.export();

    console.log(
      `exported ${activeAccount.battletag}'s season ${activeSeason.number}`,
      path
    );
  };

  const exportSeason = async () => {
    if (!activeAccount || !activeSeason || !activeAccount.battletag) {
      return;
    }

    const defaultPath = FileUtil.defaultCsvExportFilename(
      activeAccount.battletag,
      activeSeason
    );
    const options = { defaultPath };

    const dialogResult = await showSaveDialog(options);
    const canceled = dialogResult.canceled as boolean;
    if (canceled) {
      console.log("export cancelled");
      return;
    }

    const filePath = dialogResult.filePath as string;
    console.log(
      "path for export",
      filePath,
      "season",
      activeSeason,
      "account",
      activeAccount.battletag
    );
    exportSeasonTo(filePath);
  };

  const changeActivePage = (newActivePage: string, val1?: any, val2?: any) => {
    if (newActivePage === "import") {
      if (typeof val1 === "string") {
        changeActiveAccount(val1);
      }
    }

    setActivePage(newActivePage);

    if (newActivePage === "log-match") {
      if (typeof val1 === "number") {
        setLatestRank(val1);
      }

      if (typeof val2 === "string") {
        setLatestGroup(val2);
      } else {
        setLatestGroup(null);
      }
    } else {
      setLatestGroup(null);
    }

    if (newActivePage === "accounts") {
      setActiveAccount(null);
      setLatestRank(2500);
    }

    if (newActivePage === "matches") {
      if (typeof val1 === "string") {
        setScrollToMatchID(val1);
      } else {
        setScrollToMatchID(null);
      }
    } else {
      setScrollToMatchID(null);
    }

    if (newActivePage === "edit-match") {
      setActiveMatchID(val1);
    } else {
      setActiveMatchID(null);
    }
  };

  const updateTheme = () => {
    if (!settings) {
      return;
    }

    let newTheme = "light";
    if (settings.theme === "dark") {
      newTheme = "dark";
    } else if (settings.theme === "auto" && isNighttime()) {
      newTheme = "dark";
    }

    setTheme(newTheme);
  };

  const onMatchesImported = (matches: Array<Match>) => {
    console.log(
      "imported",
      matches.length,
      "match(es) into season",
      activeSeason,
      "in account",
      activeAccount && activeAccount._id
    );
    changeActivePage("matches");
  };

  const onSeasonCreate = (newSeason: Season, allSeasons: Season[]) => {
    setSeasons(allSeasons);
    changeActiveSeason(newSeason);
  };

  const onSeasonDelete = (deletedSeason: Season, allSeasons: Season[]) => {
    setSeasons(allSeasons);
    if (latestSeason && latestSeason.equals(deletedSeason)) {
      setLatestSeason(allSeasons[0]);
    }
    if (activeSeason && activeSeason.equals(deletedSeason)) {
      changeActiveSeason(allSeasons[0]);
    }
  };

  const changeActiveAccount = (accountID: string) => {
    const account = accounts.filter(a => a._id === accountID)[0];
    if (!account) {
      setActiveAccount(null);
      return;
    }

    setActiveAccount(account);

    if (!["trends", "import", "matches"].includes(activePage)) {
      setActivePage("matches");
    }
  };

  const onSettingsSaved = (newSettings: Settings) => {
    setSettings(newSettings);
    setActivePage("matches");
    updateTheme();
    activateDefaultAccount();
  };

  const showHeader =
    activePage !== "about" &&
    activePage !== "settings" &&
    activePage !== "help";

  useEffect(() => {
    const millisecondsInHour = 3600000;
    themeInterval.current = setInterval(
      () => updateTheme(),
      millisecondsInHour
    );

    refreshAccounts();
    loadSeasons();
    loadSettings();

    return () => {
      if (themeInterval.current) {
        clearInterval(themeInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    setTitle(getTitle(activePage, activeSeason, activeAccount));
  }, [activeAccount && activeAccount._id, activeSeason && activeSeason.number, activePage]);

  useEffect(() => {
    if (accounts.length < 1 || !activeSeason || seasons.length < 1 || typeof openQueue !== "boolean") {
      return;
    }

    updateTheme();

    new AppMenu({
      onPageChange: changeActivePage,
      onSeasonChange: changeActiveSeason,
      onAccountChange: changeActiveAccount,
      onExport: exportSeason,
      season: activeSeason,
      seasons,
      accountID: activeAccount ? activeAccount._id : null,
      accounts,
      openQueue
    });
  }, [
    activeAccount && activeAccount._id,
    latestSeason && latestSeason.number,
    activeSeason && activeSeason.number,
    accounts.length,
    seasons.length
  ]);

  if (activeSeason === null) {
    return (
      <ThemeProvider theme={getAppTheme(theme)}>
        <LayoutContainer>
          <LoadingPage />
        </LayoutContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={getAppTheme(theme)}>
      <LayoutContainer>
        {showHeader && typeof openQueue === "boolean" && (
          <Header
            accounts={accounts}
            seasons={seasons}
            activePage={activePage}
            activeAccount={activeAccount}
            onPageChange={changeActivePage}
            activeSeason={activeSeason}
            onSeasonChange={changeActiveSeason}
            onExport={exportSeason}
            openQueue={openQueue}
            onOpenQueueChange={changeOpenQueue}
          />
        )}

        {activePage === "matches" && activeAccount && typeof openQueue === "boolean" && activeAccount._id && (
          <MatchesPage
            account={activeAccount}
            season={activeSeason}
            openQueue={openQueue}
            onPageChange={changeActivePage}
            scrollToMatchID={scrollToMatchID}
            theme={theme}
          />
        )}

        {activePage === "log-match" && typeof openQueue === "boolean" && latestSeason && activeAccount && activeAccount._id && (
          <MatchCreatePage
            accountID={activeAccount._id}
            onPageChange={changeActivePage}
            onSeasonChange={changeActiveSeason}
            latestRank={latestRank}
            latestGroup={latestGroup}
            season={activeSeason}
            theme={theme}
            openQueue={openQueue}
            latestSeason={latestSeason}
          />
        )}

        {activePage === "import" && activeAccount && activeAccount._id && (
          <ImportPage
            season={activeSeason}
            account={activeAccount}
            onImport={onMatchesImported}
          />
        )}

        {activePage === "edit-match" &&
          activeMatchID &&
          activeAccount &&
          activeAccount._id && (
            <MatchEditPage
              id={activeMatchID}
              season={activeSeason}
              accountID={activeAccount._id}
              theme={theme}
              onPageChange={changeActivePage}
            />
          )}

        {activePage === "about" && (
          <AboutPage theme={theme} onPageChange={changeActivePage} />
        )}

        {activePage === "help" && (
          <HelpPage theme={theme} onPageChange={changeActivePage} />
        )}

        {activePage === "trends" && typeof openQueue === "boolean" && activeAccount && activeAccount._id && (
          <TrendsPage
            account={activeAccount}
            season={activeSeason}
            theme={theme}
            openQueue={openQueue}
          />
        )}

        {activePage === "settings" && settings && (
          <SettingsPage
            onPageChange={changeActivePage}
            accounts={accounts}
            settings={settings}
            onSave={onSettingsSaved}
          />
        )}

        {latestSeason && activePage === "accounts" && (
          <AccountsPage
            accounts={accounts}
            season={activeSeason}
            latestSeason={latestSeason}
            onCreate={refreshAccounts}
            onPageChange={changeActivePage}
            onAccountChange={changeActiveAccount}
            onAccountUpdate={refreshAccounts}
            onSeasonCreate={onSeasonCreate}
            onSeasonDelete={onSeasonDelete}
            latestSeasonCanBeDeleted={
              latestSeason ? latestSeason.number > Season.latestKnownSeason && latestSeasonTotalMatches === 0 : false
            }
          />
        )}
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default App;
