import React, { useState } from "react";
import CsvImporter from "../../models/CsvImporter";
import Match from "../../models/Match";
import Account from "../../models/Account";
import "./ImportForm.css";

interface Props {
  onImport: (matches: Match[]) => void;
  season: number;
  account: Account;
}

type LogEntry = {
  message: string;
  key: string;
}

const ImportForm = ({ onImport, season, account }: Props) => {
  const [path, setPath] = useState("");
  const [importLogEntries, setImportLogEntries] = useState<LogEntry[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const onImportComplete = (matches: Match[]) => {
    setPath("");
    setIsImporting(false);
    onImport(matches);
  };

  const logMatchImport = (match: Match) => {
    const logEntries = importLogEntries.slice(0);
    const messageParts = [
      "Imported:",
      typeof match.rank === "number" ? match.rank : match.result,
      match.map ? `on ${match.map}` : null,
      match.heroList.length > 0 ? `as ${match.heroList.join(", ")}` : null,
      match.groupList.length > 0 ? `with ${match.groupList.join(", ")}` : null
    ];
    const message = messageParts.filter(part => part).join(" ");

    logEntries.unshift({ message, key: match._id || "unknown match" });

    setImportLogEntries(logEntries);
  };

  const importFromPath = async () => {
    const importer = new CsvImporter(path, season, account._id);

    console.log("wiped season", season, "for account", account._id);
    const matches = await importer.import(logMatchImport);
    onImportComplete(matches);
  };

  const wipeSeasonAndImport = async () => {
    const logEntries = importLogEntries.slice(0);
    const message = `Deleting ${account.battletag}'s existing matches in season ${season}...`;

    logEntries.unshift({ message, key: "wipe-notice" });

    setIsImporting(true);
    setImportLogEntries(logEntries);

    await Match.wipeSeason(account._id, season)
    importFromPath();
  };

  const onFormSubmit = () => {
    const message = `Are you sure you want to replace match history for ${account.battletag} in season ${season} with this file?`;
    if (!window.confirm(message)) {
      return;
    }

    if (!isValid || isImporting) {
      return;
    }

    wipeSeasonAndImport();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      setIsValid(false);
      return;
    }
    const file = event.target.files[0];
    if (!file) {
      setIsValid(false);
      return;
    }

    setPath(file.path);
    setIsValid(true);
  };

  return (
    <form onSubmit={evt => {
      evt.preventDefault();
      onFormSubmit();
    }}>
      <dl className="form-group mt-0">
        <dt>
          <label htmlFor="csv">Choose a CSV file:</label>
        </dt>
        <dd>
          <input
            type="file"
            id="csv"
            required
            disabled={isImporting}
            className="form-control"
            onChange={onFileChange}
          />
        </dd>
      </dl>
      {isImporting ? (
        <button type="button" disabled className="btn btn-primary">
          Importing...
        </button>
      ) : (
        <button type="submit" disabled={!isValid} className="btn btn-primary">
          Import {account.battletag}'s season {season} matches
        </button>
      )}
      {importLogEntries.length > 0 ? (
        <div className="border-top mt-4 pt-4">
          <ul className="list-style-none import-log-list">
            {importLogEntries.map(log => (
              <li key={log.key}>{log.message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
};

export default ImportForm;
