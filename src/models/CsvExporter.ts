import stringify from "csv-stringify";
import Match from "./Match";
import { writeFile } from "../utils/electronUtils";

const headers = [
  "Battletag",
  "Season",
  "Role",
  "Rank",
  "Rank Change",
  "Result",
  "Win Streak",
  "Loss Streak",
  "Placement",
  "Map",
  "Comment",
  "Date",
  "Day",
  "Time",
  "Heroes",
  "Group",
  "Group Size",
  "Play of the Game",
  "Ally Leaver",
  "Ally Thrower",
  "Enemy Leaver",
  "Enemy Thrower",
  "Joined Voice"
];

const charForBoolean = (bool?: boolean) => {
  return bool ? "Y" : "N";
};

class CsvExporter {
  path: string;
  season: number;
  battletag: string;
  accountID: string;

  constructor(
    path: string,
    season: number,
    accountID: string,
    battletag: string
  ) {
    this.path = path;
    this.season = season;
    this.battletag = battletag;
    this.accountID = accountID;
  }

  getMatches = () => {
    return Match.findAll(this.accountID, this.season);
  };

  getValueFor = (header: string, match: Match) => {
    if (header === "Rank") {
      return match.rank;
    }
    if (header === "Role") {
      return match.role;
    }
    if (header === "Rank Change") {
      return match.rankChange;
    }
    if (header === "Win Streak") {
      return match.winStreak;
    }
    if (header === "Loss Streak") {
      return match.lossStreak;
    }
    if (header === "Map") {
      return match.map;
    }
    if (header === "Comment") {
      return match.comment;
    }
    if (header === "Date") {
      if (match.playedAt) {
        return match.playedAt.toISOString();
      }
      return null;
    }
    if (header === "Day") {
      return match.dayOfWeek;
    }
    if (header === "Time") {
      return match.timeOfDay;
    }
    if (header === "Heroes") {
      return match.heroList.join(", ");
    }
    if (header === "Ally Leaver") {
      return charForBoolean(match.allyLeaver);
    }
    if (header === "Enemy Leaver") {
      return charForBoolean(match.enemyLeaver);
    }
    if (header === "Ally Thrower") {
      return charForBoolean(match.allyThrower);
    }
    if (header === "Enemy Thrower") {
      return charForBoolean(match.enemyThrower);
    }
    if (header === "Group") {
      return match.groupList.join(", ");
    }
    if (header === "Group Size") {
      return match.groupSize;
    }
    if (header === "Placement") {
      return charForBoolean(match.isPlacement);
    }
    if (header === "Play of the Game") {
      return charForBoolean(match.playOfTheGame);
    }
    if (header === "Joined Voice") {
      return charForBoolean(match.joinedVoice);
    }
    if (header === "Result") {
      return match.result;
    }
    if (header === "Season") {
      return match.season;
    }
    if (header === "Battletag") {
      return this.battletag;
    }
  };

  getRowFrom = (match: Match) => {
    const row = [];
    for (const header of headers) {
      const value = this.getValueFor(header, match) || null;
      row.push(value);
    }
    return row;
  };

  getRowsFrom = (matches: Match[]) => {
    const rows: (string | number | null)[][] = [headers];
    for (const match of matches) {
      rows.push(this.getRowFrom(match));
    }
    return rows;
  };

  generateCsv = (matches: Match[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      const rows = this.getRowsFrom(matches);

      stringify(rows, (err, output) => {
        if (err) {
          console.error("failed to generate CSV", err);
          reject(err);
        } else {
          resolve(output);
        }
      });
    });
  };

  async export() {
    const matches = await this.getMatches();
    const csv = await this.generateCsv(matches);
    return writeFile(this.path, csv);
  }
}

export default CsvExporter;
