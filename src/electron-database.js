const path = require("path");
const { ipcMain, app } = require("electron");
const log = require("electron-log");
const Datastore = require("nedb");

const databases = {};
const env = process.env.ELECTRON_START_URL ? "development" : "production";

// Migrations

function saveOpenQueue(matchesDB, row, openQueue) {
  const conditions = {_id: row._id};
  const data = Object.assign({}, row);
  data.openQueue = openQueue;
  const update = { $set: data };
  const options = {};
  matchesDB.update(conditions, update, options, (err, numReplaced) => {
    if (err) {
      log.error("error updating openQueue for match", row._id, err);
    } else {
      log.info(`changed openQueue=${row.openQueue} to openQueue=${openQueue} ` +
        `for match ${row._id} in season ${row.season}; updated ${numReplaced} row(s)`);
    }
  });
}

function getOpenQueueFor(row) {
  const season = parseInt(row.season, 10);
  if (season < 18) { // role queue added in competitive season 18
    return true;
  }
  if (season >= 18 && season < 23) { // role queue only
    return false;
  }
  return false; // open queue supported but default to role queue
}

function populateOpenQueue(matchesDB) {
  log.info("migrating matches database: populate openQueue");
  const conditions = { openQueue: { $nin: [true, false] } };
  matchesDB.find(conditions).exec((err, rows) => {
    if (err) {
      log.error("error finding unpopulated openQueue matches:", err);
    } else {
      log.info(`updating ${rows.length} row(s)`)
      for (const row of rows) {
        const openQueue = getOpenQueueFor(row);
        saveOpenQueue(matchesDB, row, openQueue);
      }
    }
  });
}

// Database utilities

const getDatabaseFilename = name => {
  const dbDir = app.getPath("userData");
  const dbFile = `competiwatch-${name}-${env}.json`;

  return path.join(dbDir, dbFile);
};

const loadAccountsDatabase = () => {
  const filename = getDatabaseFilename("accounts");
  const db = new Datastore({ filename });

  db.loadDatabase();
  db.ensureIndex({ fieldName: "battletag", unique: true }, err => {
    if (err) {
      log.error("failed to add accounts.battletag index", err);
    }
  });

  databases.accounts = db;
};

const loadMatchesDatabase = () => {
  const filename = getDatabaseFilename("matches");
  const db = new Datastore({ filename });

  db.loadDatabase();

  // Migrations
  populateOpenQueue(db);

  databases.matches = db;
};

const loadSeasonsDatabase = () => {
  const filename = getDatabaseFilename("seasons");
  const db = new Datastore({ filename });

  db.loadDatabase();

  databases.seasons = db;
};

const loadSettingsDatabase = () => {
  const filename = getDatabaseFilename("settings");
  const db = new Datastore({ filename });

  db.loadDatabase();

  databases.settings = db;
};

const databaseFor = name => {
  if (name === "accounts") {
    if (!databases.accounts) {
      loadAccountsDatabase();
    }
    return databases.accounts;
  }
  if (name === "matches") {
    if (!databases.matches) {
      loadMatchesDatabase();
    }
    return databases.matches;
  }
  if (name === "seasons") {
    if (!databases.seasons) {
      loadSeasonsDatabase();
    }
    return databases.seasons;
  }
  if (name === "settings") {
    if (!databases.settings) {
      loadSettingsDatabase();
    }
    return databases.settings;
  }
};

// Database call handlers

ipcMain.on("get-db-path", (event, replyTo, dbName) => {
  const dbPath = getDatabaseFilename(dbName);
  event.sender.send(replyTo, dbPath);
});

ipcMain.on("find-one", (event, replyTo, dbName, conditions) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for find-one");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.findOne(conditions, (err, data) => {
    if (err) {
      log.error("find-one error", err);
    }
    event.sender.send(replyTo, err, data);
  });
});

ipcMain.on("find-all", (event, replyTo, dbName, sort, conditions) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for find-all");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.find(conditions || {})
    .sort(sort)
    .exec((err, rows) => {
      if (err) {
        log.error("find-all error", err);
      }
      event.sender.send(replyTo, err, rows);
    });
});

ipcMain.on("count", (event, replyTo, dbName, conditions) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for count");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.count(conditions, (err, count) => {
    if (err) {
      log.error("count error", err);
    }
    event.sender.send(replyTo, err, count);
  });
});

ipcMain.on("delete", (event, replyTo, dbName, conditions, options) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for delete");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.remove(conditions, options, (err, numRemoved) => {
    if (err) {
      log.error("delete error", err);
    }
    event.sender.send(replyTo, err, numRemoved);
  });
});

ipcMain.on("update", (event, replyTo, dbName, conditions, update, options) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for update");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.update(conditions, update, options, (err, numReplaced) => {
    if (err) {
      log.error("update error", err);
    }
    event.sender.send(replyTo, err, numReplaced);
  });
});

ipcMain.on("insert", (event, replyTo, dbName, rows) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for insert");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.insert(rows, (err, newRecords) => {
    if (err) {
      log.error("insert error", err);
    }
    event.sender.send(replyTo, err, newRecords);
  });
});

ipcMain.on("find-latest", (event, replyTo, dbName, conditions, sort) => {
  const db = databaseFor(dbName);
  if (!db) {
    log.error(dbName, "database not loaded for find-latest");
    event.sender.send(replyTo, "database not loaded");
    return;
  }

  db.find(conditions)
    .sort(sort)
    .limit(1)
    .exec((err, rows) => {
      if (err) {
        log.error("find-latest error", err);
      }
      event.sender.send(replyTo, err, rows);
    });
});
