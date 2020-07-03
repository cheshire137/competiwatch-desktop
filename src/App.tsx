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
import SeasonsPage from "./components/SeasonsPage";
import TrendsPage from "./components/TrendsPage";
import AboutPage from "./components/AboutPage";
import ImportPage from "./components/ImportPage";
import MatchEditPage from "./components/MatchEditPage";
import SettingsPage from "./components/SettingsPage";
import LayoutContainer from "./components/LayoutContainer";
import "./primer.css";
import "./ionicons.min.css";
import "./App.css";
import { setTitle, showSaveDialog } from "./utils/electronUtils";
import getAppTheme from "./getAppTheme";
import { ThemeProvider } from "styled-components";

const latestKnownSeason = 23;

const isNighttime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  return hours >= 20 || hours <= 5;
};

function getTitle(
  activePage: string,
  activeSeason?: number,
  activeAccount?: Account | null
) {
  const haveActiveSeason =
    typeof activeSeason === "number" && !isNaN(activeSeason);
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
  } else if (activePage === "manage-seasons") {
    titleParts.push("Manage Seasons");
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

  if (haveActiveSeason && isSeasonRelevant) {
    titleParts.push(`Season ${activeSeason}`);
  }

  if (activeAccount && isAccountRelevant) {
    titleParts.push(activeAccount.battletag);
  }

  return titleParts.join(" / ");
}

const App = () => {
  const [latestRank, setLatestRank] = useState(2500);
  const themeInterval = useRef<number | null>(null);
  const [latestSeason, setLatestSeason] = useState(latestKnownSeason);
  const [scrollToMatchID, setScrollToMatchID] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [activeSeason, setActiveSeason] = useState<number>(latestKnownSeason);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [activeMatchID, setActiveMatchID] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string>("accounts");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [latestGroup, setLatestGroup] = useState<string | null>(null);

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

  async function loadLatestSeason() {
    const season = await Season.latest();
    let latestNumber = latestKnownSeason;
    if (season && season.number > latestNumber) {
      latestNumber = season.number;
    }
    setActiveSeason(latestNumber);
    changeActiveSeason(latestNumber);
  }

  async function loadSettings() {
    const loadedSettings = await Setting.load();
    setSettings(loadedSettings);
  }

  async function refreshAccounts() {
    const allAccounts = await Account.findAll();
    setAccounts(allAccounts);
    activateDefaultAccount();
  }

  const changeActiveSeason = (newNumber: number) => {
    setActiveSeason(newNumber);
    if (activeMatchID) {
      setActiveMatchID(null);
    }
    if (activePage === "edit-match" || activePage === "log-match") {
      setActivePage("matches");
    }
    if (newNumber > latestSeason) {
      setLatestSeason(newNumber);
    }
  };

  const exportSeasonTo = async (path: string) => {
    if (!activeAccount || !activeAccount.battletag) {
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
      `exported ${activeAccount.battletag}'s season ${activeSeason}`,
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

  const onSeasonDelete = (deletedNumber: number) => {
    if (latestSeason === deletedNumber) {
      setLatestSeason(deletedNumber - 1);
    }
    if (activeSeason === deletedNumber) {
      setActiveSeason(deletedNumber - 1);
    }
  };

  const changeActiveAccount = (accountID: string) => {
    const account = accounts.filter(a => a._id === accountID)[0];
    if (!account) {
      setActiveAccount(null);
      return;
    }

    setActiveAccount(account);

    if (activePage !== "trends" && activePage !== "matches") {
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
    activePage !== "manage-seasons" &&
    activePage !== "help";

  useEffect(() => {
    const millisecondsInHour = 3600000;
    themeInterval.current = setInterval(
      () => updateTheme(),
      millisecondsInHour
    );

    refreshAccounts();
    loadLatestSeason();
    loadSettings();

    return () => {
      if (themeInterval.current) {
        clearInterval(themeInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    setTitle(getTitle(activePage, activeSeason, activeAccount));
  }, [activeAccount && activeAccount._id, activeSeason, activePage]);

  useEffect(() => {
    if (!accounts) {
      return;
    }

    updateTheme();

    new AppMenu({
      onPageChange: changeActivePage,
      onSeasonChange: changeActiveSeason,
      onAccountChange: changeActiveAccount,
      onExport: exportSeason,
      season: activeSeason,
      latestSeason,
      accountID: activeAccount ? activeAccount._id : null,
      accounts
    });
  }, [
    activeAccount && activeAccount._id,
    latestSeason,
    activeSeason,
    accounts.length
  ]);

  return (
    <ThemeProvider theme={getAppTheme(theme)}>
      <LayoutContainer>
        {showHeader && (
          <Header
            accounts={accounts}
            activePage={activePage}
            activeAccount={activeAccount}
            onPageChange={changeActivePage}
            activeSeason={activeSeason}
            latestSeason={latestSeason}
            onSeasonChange={changeActiveSeason}
            onAccountChange={changeActiveAccount}
            onExport={exportSeason}
          />
        )}

        {activePage === "matches" && activeAccount && activeAccount._id && (
          <MatchesPage
            account={activeAccount}
            season={activeSeason}
            onPageChange={changeActivePage}
            scrollToMatchID={scrollToMatchID}
            theme={theme}
          />
        )}

        {activePage === "log-match" && activeAccount && activeAccount._id && (
          <MatchCreatePage
            accountID={activeAccount._id}
            onPageChange={changeActivePage}
            onSeasonChange={changeActiveSeason}
            latestRank={latestRank}
            latestGroup={latestGroup}
            season={activeSeason}
            theme={theme}
            latestSeason={latestSeason}
          />
        )}

        {activePage === "manage-seasons" && (
          <SeasonsPage
            theme={theme}
            latestSeason={latestSeason}
            firstNonDeletableSeason={latestKnownSeason}
            onCreate={changeActiveSeason}
            onDelete={onSeasonDelete}
            onPageChange={changeActivePage}
          />
        )}

        {activePage === "import" && activeAccount && activeAccount._id && (
          <ImportPage
            seasonNumber={activeSeason}
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

        {activePage === "trends" && activeAccount && activeAccount._id && (
          <TrendsPage
            accountID={activeAccount._id}
            season={activeSeason}
            onPageChange={changeActivePage}
            theme={theme}
          />
        )}

        {activePage === "settings" && settings && (
          <SettingsPage
            onPageChange={changeActivePage}
            accounts={accounts}
            settings={settings}
            theme={theme}
            onSave={onSettingsSaved}
          />
        )}

        {activePage === "accounts" && (
          <AccountsPage
            accounts={accounts}
            theme={theme}
            season={activeSeason}
            onCreate={refreshAccounts}
            onAccountChange={changeActiveAccount}
            onAccountUpdate={refreshAccounts}
          />
        )}
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default App;
