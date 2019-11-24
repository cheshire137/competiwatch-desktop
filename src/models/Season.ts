import Database from "./Database";

interface SeasonData {
  _id: string;
  number: string;
  createdAt?: string;
}

class Season {
  public static roleQueueSeasonStart: number = 18;

  static latest() {
    const conditions = {};
    const sort = { number: -1 };

    return Database.latest("seasons", conditions, sort).then(data => {
      if (data) {
        return new Season(data);
      }
    });
  }

  _id: string;
  number: number;
  createdAt?: Date;

  constructor(data: SeasonData) {
    this._id = data._id;
    this.number = parseInt(data.number, 10);
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
  }

  totalMatches() {
    const conditions = { season: this.number };
    return Database.count("matches", conditions);
  }

  save() {
    const data = { number: this.number };
    return Database.upsert("seasons", data, this._id).then(record => {
      const newSeason: Season = record as Season;
      this._id = newSeason._id;
      if (newSeason.createdAt) {
        this.createdAt = newSeason.createdAt;
      }
      return this;
    });
  }

  delete() {
    const conditions = { number: this.number };
    return Database.deleteSome("seasons", conditions);
  }
}

export default Season;
