import React, { useState } from "react";
import { openInExplorer, getDbPath } from "../utils/electronUtils";

interface Props {
  dbName: string;
  label: string;
}

const DatabaseFileLink = ({ dbName, label }: Props) => {
  const [dbPath, setDbPath] = useState<string | null>(null);

  const replyTo = `get-db-path-${dbName}`;
  getDbPath(replyTo, dbName, (event: any, newDbPath: string) => {
    setDbPath(newDbPath);
  });

  const onDbPathClick = () => {
    if (!dbPath || dbPath.length < 1) {
      return;
    }
    openInExplorer(dbPath);
  };

  return (
    <div className="d-flex">
      <span className="d-inline-block mr-2 no-wrap">{label}</span>
      <button
        type="button"
        onClick={onDbPathClick}
        className="btn-link text-left ws-normal"
      >
        {dbPath}
      </button>
    </div>
  );
};

export default DatabaseFileLink;
