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

  static findAll() {
    const sort = {};
    return Database.findAll("settings", sort).then(rows =>
      rows.map((data: any) => new Setting(data))
    );
  }

  static load() {
    return this.findAll().then(settings => {
      return settings[0] || new Setting({});
    });
  }

  constructor(data: SettingData) {
    this._id = data._id;
    this.defaultAccountID = data.defaultAccountID;
    this.theme = data.theme || "light";
    if (data.createdAt) {
      this.createdAt = new Date(data.createdAt);
    }
  }

  save() {
    const data = {
      defaultAccountID: this.defaultAccountID,
      theme: this.theme
    };
    return Database.upsert("settings", data, this._id).then((data: any) => {
      const newSetting = data as SettingData;
      this._id = newSetting._id;
      if (typeof newSetting.createdAt === "string") {
        this.createdAt = new Date(newSetting.createdAt);
      }
      return this;
    });
  }

  delete() {
    if (this._id) {
      return Database.delete("settings", this._id);
    }
  }
}

export default Setting;
