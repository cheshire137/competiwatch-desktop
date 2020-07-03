import React from "react";
import SettingsForm from "./SettingsForm";
import DatabaseFileLink from "./DatabaseFileLink";
import Account from "../models/Account";
import Setting from "../models/Setting";
import LayoutChildrenContainer from "./LayoutChildrenContainer";
import LinkButton from "./LinkButton";
import HorizontalRule from "./HorizontalRule";

const dbNames = ["accounts", "matches", "seasons", "settings"];

function dbLabelFor(name: string): string {
  if (name === "accounts") {
    return "Accounts";
  }
  if (name === "matches") {
    return "Matches";
  }
  if (name === "seasons") {
    return "Seasons";
  }
  if (name === "settings") {
    return "Settings";
  }
  return name;
}

interface Props {
  accounts: Array<Account>;
  settings: Setting;
  onSave: (newSettings: Setting) => void;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const SettingsPage = ({
  accounts,
  settings,
  onSave,
  onPageChange
}: Props) => (
  <LayoutChildrenContainer>
    <div className="mt-4">
      <LinkButton onClick={() => onPageChange("accounts")}>
        &larr; Back to your accounts
      </LinkButton>
    </div>
    <h1 className="h1 mb-2 mt-4">Settings</h1>
    <div className="col-md-6 mb-4">
      <SettingsForm accounts={accounts} settings={settings} onSave={onSave} />
    </div>
    <HorizontalRule />
    <div className="mb-4">
      <h2 className="h2 mb-2">Data files</h2>
      <p>
        Competiwatch stores your match history, accounts, settings, and other
        data in JSON files. You can back up these files if you like.
      </p>
      <ul className="list-style-none">
        {dbNames.map(dbName => (
          <li className="mb-2" key={dbName}>
            <DatabaseFileLink
              label={`${dbLabelFor(dbName)}:`}
              dbName={dbName}
            />
          </li>
        ))}
      </ul>
      <p>
        <strong className="text-red">Warning:</strong> deleting, editing, or
        moving these files can result in losing your competitive match history.
      </p>
    </div>
  </LayoutChildrenContainer>
);

export default SettingsPage;
