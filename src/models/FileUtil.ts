import DateUtil from "./DateUtil";

class FileUtil {
  static defaultCsvExportFilename(battletag: string, season: number): string {
    const simpleBattletag = battletag.replace(/\s+/g, "-").replace(/#+/g, "-");
    const dateStr = DateUtil.dateStrFrom(new Date());

    return `${simpleBattletag}-season-${season}-${dateStr}.csv`;
  }
}

export default FileUtil;
