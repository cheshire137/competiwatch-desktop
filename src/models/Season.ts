import Database from "./Database";

interface SeasonData {
  _id?: string;
  number: string | number;
  createdAt?: string;
}

const defaultSort = { number: -1 };

class Season {
  // Latest season of competitive available at this time.
  public static latestKnownSeason: number = 23;

  // First season where role queue was required for competitive.
  public static roleQueueSeasonStart: number = 18;

  // First season where Overwatch introduced the choice between open
  // queue and role queue in competitive.
  public static openQueueSeasonStart: number = 23;

  static async latest() {
    const conditions = {};
    const sort = { number: -1 };

    const data: SeasonData = await Database.latest("seasons", conditions, sort);
    if (data) {
      return new Season(data);
    }

    return new Season({ number: this.latestKnownSeason });
  }

  static onlyOpenQueue(season: number) {
    return season < Season.roleQueueSeasonStart;
  }

  static onlyRoleQueue(season: number) {
    return season >= Season.roleQueueSeasonStart &&
      season < Season.openQueueSeasonStart;
  }

  _id?: string;
  number: number;
  createdAt?: Date;

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
  }

  totalMatches() {
    const conditions: any = { season: this.number };
    return Database.count("matches", conditions);
  }

  static async exists(season: number) {
    const conditions = { number: season }
    const count = await Database.count("seasons", conditions);
    if (count > 0) {
      return true;
    }
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
      seenNumbers.push(seasonNumber);
    }
    return seasons.sort((a, b) => {
      if (a.number > b.number) {
        return -1;
      }
      return a.number === b.number ? 0 : 1;
    });
  }

  equals(other: Season) {
    return this.number === other.number;
  }

  async save() {
    const data = { number: this.number };
    const record = await Database.upsert("seasons", data, this._id);
    const newSeason: Season = record as Season;
    this._id = newSeason._id;
    if (newSeason.createdAt) {
      this.createdAt = newSeason.createdAt;
    }
    return this;
  }

  delete() {
    if (this._id) {
      return Database.delete("seasons", this._id);
    }
    return Database.deleteSome("seasons", { number: this.number });
  }

  async priorSeason() {
    const conditions = { number: this.number - 1 };
    const data = await Database.findOne("seasons", conditions);
    if (data) {
      return new Season(data);
    }
    return new Season(conditions);
  }
}

export default Season;
