import Database from "./Database";

interface SettingData {
  _id?: string;
  defaultAccountID?: string;
  theme?: string;
  createdAt?: string;
}

class Setting {
  _id?: string;
  defaultAccountID?: string;
  theme: string;
  createdAt?: Date;

  static async findAll() {
    const sort = {};
    const rows = await Database.findAll("settings", sort);
    return rows.map((data: any) => new Setting(data));
  }

  static async load() {
    const settings = await this.findAll();
    return settings[0] || new Setting({});
  }

  constructor(data: SettingData) {
    this._id = data._id;
    this.defaultAccountID = data.defaultAccountID;
    this.theme = data.theme || "light";
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
  }

  async save() {
    const data = {
      defaultAccountID: this.defaultAccountID,
      theme: this.theme
    };
    const upsertData = await Database.upsert("settings", data, this._id);
    const newSetting = upsertData as SettingData;
    this._id = newSetting._id;
    if (typeof newSetting.createdAt === "string") {
      this.createdAt = new Date(newSetting.createdAt);
    }
    return this;
  }

  delete() {
    if (this._id) {
      return Database.delete("settings", this._id);
    }
  }
}

export default Setting;
