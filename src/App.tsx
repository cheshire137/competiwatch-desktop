import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Account from './models/Account'
import Match from './models/Match';
import Season from './models/Season'
import Setting from './models/Setting'
import AppMenu from './models/AppMenu'
import CsvExporter from './models/CsvExporter'
import FileUtil from './models/FileUtil'
import AccountsPage from './components/AccountsPage'
import MatchesPage from './components/MatchesPage'
import HelpPage from './components/HelpPage'
import MatchCreatePage from './components/MatchCreatePage'
import SeasonsPage from './components/SeasonsPage'
import TrendsPage from './components/TrendsPage'
import AboutPage from './components/AboutPage'
import ImportPage from './components/ImportPage'
import MatchEditPage from './components/MatchEditPage'
import SettingsPage from './components/SettingsPage'
import './primer.css'
import './ionicons.min.css'
import './App.css'
import { setTitle, showSaveDialog } from "./utils/electronUtils";

const latestKnownSeason = 19;

const isNighttime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  return hours >= 20 || hours <= 5;
};

interface Settings {
  defaultAccountID?: string | null;
  theme?: string | null;
}

const App = () => {
  const [latestRank, setLatestRank] = useState(2500);
  const [latestSeason, setLatestSeason] = useState(latestKnownSeason);
  const [scrollToMatch, setScrollToMatch] = useState(false);
  const [scrollToMatchID, setScrollToMatchID] = useState<string | null>(null);
  const [theme, setTheme] = useState("light");
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [activeSeason, setActiveSeason] = useState<number>(latestKnownSeason);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [activeMatchID, setActiveMatchID] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string>('accounts');
  const [settings, setSettings] = useState<Settings | null>(null);
  const [latestGroup, setLatestGroup] = useState<string | null>(null);

  const changeActiveSeason = (newNumber: number) => {
    if (activeMatchID) {
      setActiveMatchID(null);
    }
    if (activePage === 'edit-match' || activePage === 'log-match') {
      setActivePage("matches");
    }
    if (newNumber > latestSeason) {
      setLatestSeason(newNumber);
    }
  };

  const refreshAccounts = () => {
    Account.findAll().then(allAccounts => {
      setAccounts(allAccounts);
    });
  };
  refreshAccounts();

  Season.latest().then(season => {
    let latestNumber = latestKnownSeason;
    if (season && season.number > latestNumber) {
      latestNumber = season.number;
    }
    setActiveSeason(latestNumber);
    changeActiveSeason(latestNumber);
  });
  Setting.load().then(loadedSettings => {
    setSettings(loadedSettings);

    if (!activeAccount && loadedSettings.defaultAccountID) {
      const defaultAccount = accounts.filter(a => a._id === loadedSettings.defaultAccountID)[0];

      if (defaultAccount) {
        setActiveAccount(defaultAccount);
        setActivePage("matches");
      }
    }
  });

  const exportSeasonTo = (path: string) => {
    if (!activeAccount) {
      return;
    }

    const exporter = new CsvExporter(path, activeSeason, activeAccount);
    exporter.export().then(() => {
      console.log(`exported ${activeAccount.battletag}'s season ${activeSeason}`, path);
    });
  }

  const exportSeason = () => {
    if (!activeAccount || !activeSeason) {
      return;
    }

    const defaultPath = FileUtil.defaultCsvExportFilename(activeAccount.battletag, activeSeason);
    const options = { defaultPath };

    showSaveDialog(options, (path: string) => {
      if (path && path.length > 0) {
        exportSeasonTo(path);
      }
    });
  };

  const changeActivePage = (activePage: string, val1?: any, val2?: any) => {
    setActivePage(activePage);

    if (activePage === 'log-match') {
      if (typeof val1 === 'number') {
        setLatestRank(val1);
      }

      if (typeof val2 === 'string') {
        setLatestGroup(val2);
      } else {
        setLatestGroup(null);
      }
    } else {
      setLatestGroup(null);
    }

    if (activePage === 'accounts') {
      setActiveAccount(null);
      setLatestRank(2500);
    }

    if (activePage === 'matches') {
      if (typeof val1 === 'boolean') {
        setScrollToMatch(val1);
      } else {
        setScrollToMatch(false);
      }

      if (typeof val2 === 'string') {
        setScrollToMatchID(val2);
      } else {
        setScrollToMatchID(null);
      }
    } else {
      setScrollToMatch(false);
      setScrollToMatchID(null);
    }

    if (activePage === 'edit-match') {
      setActiveMatchID(val1);
    } else {
      setActiveMatchID(null);
    }
  };

  const updateTheme = () => {
    if (!settings) {
      return;
    }

    let newTheme = 'light'
    if (settings.theme === 'dark') {
      newTheme = 'dark'
    } else if (settings.theme === 'auto' && isNighttime()) {
      newTheme = 'dark'
    }

    setTheme(newTheme);
  };

  let themeInterval: NodeJS.Timeout | null = null;

  useEffect(() => {
    const millisecondsInHour = 3600000;
    themeInterval = setInterval(() => updateTheme(), millisecondsInHour);

    return () => {
      if (themeInterval) {
        clearInterval(themeInterval);
      }
    };
  }, [setTheme]);

  useEffect(() => {
    const haveActiveSeason = typeof activeSeason === 'number' && !isNaN(activeSeason);
    const isSeasonRelevant = ['matches', 'log-match', 'trends', 'edit-match', 'import'].includes(activePage);
    const isAccountRelevant = ['matches', 'log-match', 'trends', 'edit-match', 'import'].includes(activePage);
    let titleParts = [];

    if (activePage === 'matches') {
      titleParts.push('Matches')
    } else if (activePage === 'log-match') {
      titleParts.push('Log a Match')
    } else if (activePage === 'trends') {
      titleParts.push('Trends')
    } else if (activePage === 'manage-seasons') {
      titleParts.push('Manage Seasons')
    } else if (activePage === 'edit-match') {
      titleParts.push('Edit Match')
    } else if (activePage === 'import') {
      titleParts.push('Import Matches')
    } else if (activePage === 'about') {
      titleParts.push('About')
    } else if (activePage === 'settings') {
      titleParts.push('Settings')
    } else if (activePage === 'accounts') {
      titleParts.push('Accounts')
    } else if (activePage === 'help') {
      titleParts.push('Help')
    }

    if (haveActiveSeason && isSeasonRelevant) {
      titleParts.push(`Season ${activeSeason}`)
    }

    if (activeAccount && isAccountRelevant) {
      titleParts.push(activeAccount.battletag)
    }

    setTitle(titleParts.join(' / '));
  }, [activeAccount && activeAccount._id, activeSeason, activePage]);

  const onMatchesImported = (matches: Array<Match>) => {
    console.log('imported', matches.length, 'match(es) into season', activeSeason, 'in account',
      activeAccount && activeAccount._id)
    changeActivePage('matches');
  }

  const onSeasonDelete = (deletedNumber: number) => {
    if (latestSeason === deletedNumber) {
      setLatestSeason(deletedNumber - 1);
    }
    if (activeSeason === deletedNumber) {
      setActiveSeason(deletedNumber - 1);
    }
  };

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
    })
  }, [accounts.length, latestSeason, activeSeason]);

  const changeActiveAccount = (accountID: string) => {
    const account = accounts.filter(a => a._id === accountID)[0];
    if (!account) {
      setActiveAccount(null);
      return;
    }

    if (activePage !== "trends" && activePage !== "matches") {
      setActivePage("matches");
    }
  };

  const onSettingsSaved = (newSettings: Settings) => {
    setSettings(newSettings);
    setActivePage("matches");

    const defaultAccount = accounts.filter(a => a._id === newSettings.defaultAccountID)[0];
    if (defaultAccount) {
      setActiveAccount(defaultAccount);
    }
  };

  const showHeader = activePage !== 'about' && activePage !== 'settings' &&
    activePage !== 'manage-seasons' && activePage !== 'help';
  const haveActiveSeason = typeof activeSeason === 'number' && !isNaN(activeSeason);

  return (
    <div className={`layout-container theme-${theme}`}>
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

      {activePage === 'matches' && haveActiveSeason && activeAccount && (
        <MatchesPage
          accountID={activeAccount._id}
          season={activeSeason}
          onPageChange={changeActivePage}
          scrollToMatch={scrollToMatch}
          scrollToMatchID={scrollToMatchID}
          theme={theme}
        />)}

      {activePage === 'log-match' && haveActiveSeason && activeAccount && (
        <MatchCreatePage
          accountID={activeAccount._id}
          onPageChange={changeActivePage}
          onSeasonChange={changeActiveSeason}
          latestRank={latestRank}
          latestGroup={latestGroup}
          season={activeSeason}
          theme={theme}
          latestSeason={latestSeason}
        />)}

      {activePage === 'manage-seasons' && (
        <SeasonsPage
          latestSeason={latestSeason}
          firstNonDeletableSeason={latestKnownSeason}
          onCreate={changeActiveSeason}
          onDelete={onSeasonDelete}
          onPageChange={changeActivePage}
        />)}

      {activePage === 'import' && haveActiveSeason && activeAccount && (
        <ImportPage
          season={activeSeason}
          accountID={activeAccount._id}
          onImport={onMatchesImported}
        />)}

      {activePage === 'edit-match' && activeMatchID && activeAccount && (
        <MatchEditPage
          id={activeMatchID}
          season={activeSeason}
          accountID={activeAccount._id}
          theme={theme}
          onPageChange={changeActivePage}
        />)}

      {activePage === 'about' && (
        <AboutPage onPageChange={changeActivePage} />
      )}

      {activePage === 'help' && (
        <HelpPage onPageChange={changeActivePage} />
      )}

      {activePage === 'trends' && activeAccount && (
        <TrendsPage
          accountID={activeAccount._id}
          season={activeSeason}
          onPageChange={changeActivePage}
          theme={theme}
        />)}

      {activePage === 'settings' && (
        <SettingsPage
          onPageChange={changeActivePage}
          accounts={accounts}
          settings={settings}
          onSave={onSettingsSaved}
        />)}

      {activePage === 'accounts' && haveActiveSeason && (
        <AccountsPage
          accounts={accounts}
          season={activeSeason}
          onCreate={refreshAccounts}
          onDelete={refreshAccounts}
          onAccountChange={changeActiveAccount}
          onAccountUpdate={refreshAccounts}
        />)}
    </div>
  );
};

export default App;
