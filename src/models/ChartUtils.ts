class ChartUtils {
  static wholeTicks(value: number) {
    if (Number.isInteger(value)) {
      return value;
    }
  }

  static numberWithPercentageLabel(tooltipItem: any, data: any) {
    const dataset = data.datasets[tooltipItem.datasetIndex];
    const currentValue = dataset.data[tooltipItem.index];
    let total = 0;
    for (let i = 0; i < data.datasets.length; i++) {
      total += data.datasets[i].data[tooltipItem.index];
    }
    const percentage = ((currentValue / total) * 100).toFixed(0);
    return `${dataset.label}: ${currentValue} (${percentage}%)`;
  }
}

export default ChartUtils;
