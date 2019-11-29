import Database from "./Database";

interface SeasonData {
  _id?: string;
  number: string | number;
  createdAt?: string;
}

class Season {
  public static roleQueueSeasonStart: number = 18;

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

  static totalMatches(season: number) {
    return Database.count("matches", { season });
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
    const conditions = { number: this.number };
    return Database.deleteSome("seasons", conditions);
  }
}

export default Season;
