import Database from "./Database";
import Match, { MatchData } from "./Match";
import { Hero } from "./Hero";

interface HeroWithCount {
  hero: Hero;
  count: number;
};

type HeroCount = {
  [hero: string]: number;
}

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

class Account {
  battletag?: string;
  _id: string;
  createdAt?: Date;

  static findAll() {
    const sort = { battletag: 1 }; // not case-insensitive
    return Database.findAll("accounts", sort)
      .then((rows: AccountData[]) => rows.map(data => new Account(data)))
      .then((accounts: Account[]) => accounts.sort(accountSort));
  }

  static find(id: string) {
    return Database.find("accounts", id).then(
      (data: AccountData) => new Account(data)
    );
  }

  constructor(data: AccountData) {
    this.battletag = data.battletag;
    this._id = data._id;
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
  }

  static findAllGroupMembers(accountID: string, season?: number) {
    const sort = {};
    const conditions: any = { accountID, group: { $ne: "" } };
    if (typeof season === "number" && !isNaN(season)) {
      conditions.season = season;
    }

    return Database.findAll("matches", sort, conditions).then(
      (matchRows: MatchData[]) => {
        const matches = matchRows.map(data => new Match(data));
        const groupMembers: any = {};

        for (const match of matches) {
          for (const groupMember of match.groupList) {
            if (!(groupMember in groupMembers)) {
              groupMembers[groupMember] = 1;
            }
          }
        }

        return Object.keys(groupMembers).sort();
      }
    );
  }

  topHeroes(season: number): Promise<Hero[]> {
    const sort = {};
    const conditions: any = { accountID: this._id, heroes: { $ne: "" } };
    if (typeof season === "number" && !isNaN(season)) {
      conditions.season = season;
    }

    return Database.findAll("matches", sort, conditions).then(
      (matchRowsData: any[]) => {
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
    );
  }

  latestMatch(season: number) {
    const conditions = { accountID: this._id, season };
    const sort = { date: -1, createdAt: -1 };

    return Database.latest("matches", conditions, sort).then(
      (data: MatchData) => {
        if (data) {
          return new Match(data);
        }
      }
    );
  }

  totalMatches(season?: number): Promise<number> {
    const conditions: any = { accountID: this._id };
    if (typeof season === "number") {
      conditions.season = season;
    }
    return Database.count("matches", conditions);
  }

  hasMatches(season?: number) {
    return this.totalMatches(season).then(count => count > 0);
  }

  save() {
    const data = { battletag: this.battletag };
    return Database.upsert("accounts", data, this._id).then(
      (newAccountData: any) => {
        const newAccount = newAccountData as AccountData;
        this._id = newAccount._id;
        if (typeof newAccount.createdAt === "string") {
          this.createdAt = new Date(newAccount.createdAt);
        }
        return this;
      }
    );
  }

  delete() {
    return Database.delete("accounts", this._id);
  }
}

export default Account;
