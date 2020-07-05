import Database from "./Database";
import { runInNewContext } from "vm";

interface SeasonData {
  _id?: string;
  number: string | number;
  createdAt?: string;
  openQueue?: boolean;
}

const getNumberAndOpenQueue = (num: number, openQueue: boolean) => {
  return `${num}-open-queue-${openQueue}`;
};

const defaultSort = { number: -1, numberAndOpenQueue: -1 };

class Season {
  // Latest season of competitive available at this time.
  public static latestKnownSeason: number = 23;

  // First season where role queue was required for competitive.
  public static roleQueueSeasonStart: number = 18;

  // First season where you could choose role queue or open queue for competitive.
  public static openQueueSeasonStart: number = 23;

  static async latest() {
    const conditions = {};
    const sort = { number: -1 };

    const data: SeasonData = await Database.latest("seasons", conditions, sort);
    if (data) {
      return new Season(data);
    }
  }

  _id?: string;
  number: number;
  createdAt?: Date;
  openQueue: boolean;
  numberAndOpenQueue: string;

  constructor(data: SeasonData) {
    if (data._id) {
      this._id = data._id;
    }
    if (typeof data.number === "string") {
      this.number = parseInt(data.number, 10);
    } else {
      this.number = data.number;
    }
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
    if (typeof data.openQueue === "boolean") {
      this.openQueue = data.openQueue;
    } else {
      this.openQueue = this.number < Season.roleQueueSeasonStart;
    }
    this.numberAndOpenQueue = getNumberAndOpenQueue(
      this.number,
      this.openQueue
    );
  }

  static totalMatches(season: number) {
    return Database.count("matches", { season });
  }

  static async exists(season: number, openQueue: boolean) {
    const conditions: any = {};
    if (typeof openQueue === "boolean") {
      conditions.numberAndOpenQueue = getNumberAndOpenQueue(season, openQueue);
    } else {
      conditions.number = season;
    }
    const count = await Database.count("seasons", conditions);
    if (count > 0) {
      return true;
    }

    if (openQueue) {
      return season < this.roleQueueSeasonStart;
    }

    return (
      season >= this.roleQueueSeasonStart && season <= this.openQueueSeasonStart
    );
  }

  static async findAll() {
    const rows: SeasonData[] = await Database.findAll("seasons", defaultSort);
    const seasons = rows.map(data => new Season(data));
    const seenNumbers = seasons.map(s => s.number);
    for (
      let seasonNumber = Season.latestKnownSeason;
      seasonNumber >= 1;
      seasonNumber--
    ) {
      if (!seenNumbers.includes(seasonNumber)) {
        seasons.push(new Season({ number: seasonNumber }));
      }
    }
    return seasons.sort((a, b) => {
      if (a.number > b.number) {
        return -1;
      }
      return a.number === b.number ? 0 : 1;
    });
  }

  description() {
    if (this.openQueue) {
      return "open queue";
    }
    return "role queue";
  }

  async save() {
    const data = {
      number: this.number,
      openQueue: this.openQueue,
      numberAndOpenQueue: this.numberAndOpenQueue
    };
    const record = await Database.upsert("seasons", data, this._id);
    const newSeason: Season = record as Season;
    this._id = newSeason._id;
    if (newSeason.createdAt) {
      this.createdAt = newSeason.createdAt;
    }
    return this;
  }

  delete() {
    const conditions = { number: this.number };
    return Database.deleteSome("seasons", conditions);
  }
}

export default Season;
