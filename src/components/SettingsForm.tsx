import React, { useState } from "react";
import Setting from "../models/Setting";
import Account from "../models/Account";
import Blankslate from "./Blankslate";

interface Props {
  settings: Setting | null;
  accounts: Array<Account>;
  onSave: (newSettings: Setting) => void;
}

const SettingsForm = ({ settings, onSave, accounts }: Props) => {
  const [defaultAccountID, setDefaultAccountID] = useState<string>(
    (settings && settings.defaultAccountID) ||
      (accounts[0] && accounts[0]._id) ||
      ""
  );
  const [theme, setTheme] = useState<string>(
    (settings && settings.theme) || "light"
  );

  if (!settings) {
    return (
      <Blankslate appTheme={theme}>
        <h1>
          <span className="ion ion-md-refresh mr-3 ion-spin" />
          Loading...
        </h1>
      </Blankslate>
    );
  }

  const onSubmit = async () => {
    settings.defaultAccountID = defaultAccountID;
    settings.theme = theme;

    await settings.save();
    onSave(settings);
  };

  return (
    <form onSubmit={evt => {
      evt.preventDefault();
      onSubmit();
    }}>
      <dl className="form-group">
        <dt>
          <label htmlFor="default-account" className="label-lg">
            Default Battle.net account:
          </label>
        </dt>
        <dd>
          <select
            id="default-account"
            className="form-select select-lg"
            value={defaultAccountID}
            disabled={accounts.length < 1}
            onChange={evt => setDefaultAccountID(evt.target.value)}
          >
            <option value="">none</option>
            {accounts.map(account => (
              <option key={account._id} value={account._id}>
                {account.battletag}
              </option>
            ))}
          </select>
          <p className="note">
            Which account's match history should load when you open the app.
          </p>
        </dd>
      </dl>
      <dl className="form-group">
        <dt>
          <label htmlFor="theme" className="label-lg">
            App theme:
          </label>
        </dt>
        <dd>
          <select
            id="theme"
            className="form-select select-lg"
            value={theme}
            onChange={evt => setTheme(evt.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
          <p className="note">
            Choose an appearance for the app. 'Auto' will use the dark theme at
            night and the light theme during the day.
          </p>
        </dd>
      </dl>
      <div className="mb-4">
        <button type="submit" className="btn btn-primary btn-large">
          Save settings
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
