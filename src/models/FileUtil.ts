import DateUtil from "./DateUtil";
import Season from "./Season";

class FileUtil {
  static defaultCsvExportFilename(battletag: string, season: Season): string {
    const simpleBattletag = battletag.replace(/\s+/g, "-").replace(/#+/g, "-");
    const dateStr = DateUtil.dateStrFrom(new Date());

    return `${simpleBattletag}-season-${season.number}-${dateStr}.csv`;
  }
}

export default FileUtil;
