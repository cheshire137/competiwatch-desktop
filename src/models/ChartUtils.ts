class ChartUtils {
  static wholeTicks(value: number) {
    if (Number.isInteger(value)) {
      return value;
    }
  }
}

export default ChartUtils;
