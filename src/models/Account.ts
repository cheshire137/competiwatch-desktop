import Database from "./Database";
import Match, { MatchData } from "./Match";
import Season from "./Season";
import { Hero } from "./Hero";

interface HeroWithCount {
  hero: Hero;
  count: number;
}

type HeroCount = {
  [hero: string]: number;
};

const accountSort = (a: Account, b: Account) => {
  if (!a.battletag) {
    return -1;
  }
  if (!b.battletag) {
    return 1;
  }
  const battletagA = a.battletag.toLowerCase();
  const battletagB = b.battletag.toLowerCase();
  return battletagA.localeCompare(battletagB);
};

export interface AccountData {
  _id: string;
  battletag?: string;
  createdAt?: string;
}

type GroupMemberCount = {
  [groupMember: string]: number;
};

class Account {
  battletag?: string;
  _id: string;
  createdAt?: Date;

  static async findAll() {
    const sort = { battletag: 1 }; // not case-insensitive
    const rows: AccountData[] = await Database.findAll("accounts", sort);
    const accounts = rows.map(data => new Account(data));
    return accounts.sort(accountSort);
  }

  static async find(id: string) {
    const data: AccountData = await Database.find("accounts", id);
    return new Account(data);
  }

  constructor(data: AccountData) {
    this.battletag = data.battletag;
    this._id = data._id;
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
  }

  static async findAllGroupMembers(accountID: string, season?: Season) {
    const sort = {};
    const conditions: any = { accountID, group: { $ne: "" } };
    if (season) {
      conditions.season = season.number;
    }

    const matchRows: MatchData[] = await Database.findAll(
      "matches",
      sort,
      conditions
    );
    const matches = matchRows.map(data => new Match(data));
    const groupMembers: GroupMemberCount = {};

    for (const match of matches) {
      for (const groupMember of match.groupList) {
        if (!(groupMember in groupMembers)) {
          groupMembers[groupMember] = 1;
        }
      }
    }

    return Object.keys(groupMembers).sort();
  }

  async topHeroes(season: Season, openQueue?: boolean) {
    const sort = {};
    const conditions: any = { accountID: this._id, heroes: { $ne: "" } };
    if (season) {
      conditions.season = season.number;
    }
    if (typeof openQueue === "boolean") {
      conditions.openQueue = openQueue;
    }

    const matchRowsData: any[] = await Database.findAll("matches",
      sort, conditions);
    const matchRows = matchRowsData as MatchData[];
    const matches: Match[] = matchRows.map(data => new Match(data));
    const heroCounts: HeroCount = {};

    for (const match of matches) {
      const matchHeroes = match.heroList;

      for (const hero of matchHeroes) {
        if (!(hero in heroCounts)) {
          heroCounts[hero] = 0;
        }

        heroCounts[hero] = (heroCounts[hero] || 0) + 1;
      }
    }

    const sortableHeroCounts: HeroWithCount[] = [];
    for (const heroStr in heroCounts) {
      const hero = heroStr as Hero;
      const heroCount = heroCounts[hero];
      const heroWithCount: HeroWithCount = { hero, count: heroCount };
      sortableHeroCounts.push(heroWithCount);
    }
    sortableHeroCounts.sort((a, b) => {
      return b.count - a.count;
    });

    return sortableHeroCounts.map(arr => arr.hero).slice(0, 3);
  }

  async latestMatch(season: Season, openQueue: boolean) {
    const conditions = { accountID: this._id, season: season.number, openQueue };
    const sort = { date: -1, createdAt: -1 };

    const data: MatchData = await Database.latest("matches", conditions, sort);
    if (data) {
      return new Match(data);
    }
  }

  async totalMatches(season?: Season, openQueue?: boolean) {
    const conditions: any = { accountID: this._id };
    if (season) {
      conditions.season = season.number;
    }
    if (typeof openQueue === "boolean") {
      conditions.openQueue = openQueue;
    }
    const count = await Database.count("matches", conditions);
    return count;
  }

  async hasMatches(season?: Season) {
    const count = await this.totalMatches(season);
    return count > 0;
  }

  async save() {
    const data = { battletag: this.battletag };
    const upsertData: any = await Database.upsert("accounts", data, this._id);
    const newAccountData = upsertData as AccountData;
    this._id = newAccountData._id;
    if (typeof newAccountData.createdAt === "string") {
      this.createdAt = new Date(newAccountData.createdAt);
    }
    return this;
  }

  delete() {
    return Database.delete("accounts", this._id);
  }
}

export default Account;
