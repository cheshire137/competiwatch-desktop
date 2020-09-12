import Database from "./Database";

interface SeasonData {
  _id?: string;
  number: string | number;
  createdAt?: string;
  openQueue?: boolean;
}

const getNumberAndOpenQueue = (num: number, openQueue: boolean) => {
  return `${num}-${openQueue ? "open-queue" : "role-queue"}`;
};

const defaultSort = { number: -1, numberAndOpenQueue: -1 };

class Season {
  // Latest season of competitive available at this time.
  public static latestKnownSeason: number = 23;

  // First season where role queue was required for competitive.
  public static roleQueueSeasonStart: number = 18;

  // First season where you could choose role queue or open queue for competitive
  // and this app supported choosing between them. Overwatch introduced open
  // queue alongside role queue in competitive with season 23.
  public static openQueueSeasonStart: number = 25;

  static async latest() {
    const conditions = {};
    const sort = { number: -1 };

    const data: SeasonData = await Database.latest("seasons", conditions, sort);
    if (data) {
      return new Season(data);
    }

    return new Season({ number: this.latestKnownSeason, openQueue: false });
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

  totalMatches() {
    const conditions: any = { season: this.number };
    if (this.number >= Season.openQueueSeasonStart) {
      conditions.openQueue = this.openQueue;
    }
    return Database.count("matches", conditions);
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
    const seenOpenQueueNumbers = seasons.filter(s => s.openQueue).map(s => s.number);
    const seenRoleQueueNumbers = seasons.filter(s => !s.openQueue).map(s => s.number);
    for (
      let seasonNumber = Season.latestKnownSeason;
      seasonNumber >= 1;
      seasonNumber--
    ) {
      if (seasonNumber >= Season.openQueueSeasonStart && !seenOpenQueueNumbers.includes(seasonNumber)) {
        seasons.push(new Season({ number: seasonNumber, openQueue: true }));
        seenNumbers.push(seasonNumber);
        seenOpenQueueNumbers.push(seasonNumber);
      }
      if (seasonNumber >= Season.roleQueueSeasonStart && !seenRoleQueueNumbers.includes(seasonNumber)) {
        seasons.push(new Season({ number: seasonNumber, openQueue: false }));
        seenNumbers.push(seasonNumber);
        seenRoleQueueNumbers.push(seasonNumber);
      }
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

  equals(other: Season) {
    return this.number === other.number && this.openQueue === other.openQueue;
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
