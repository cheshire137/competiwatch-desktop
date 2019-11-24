type Color = number[];

class ColorGradient {
  colors: Color[];
  gradientCount: number;
  substepCount: number;
  remainder: number;

  constructor(colors: Color[], stepCount: number) {
    this.colors = colors;
    this.gradientCount = colors.length - 1;
    this.substepCount = stepCount / this.gradientCount;
    this.remainder = stepCount % this.gradientCount;
  }

  rgb(): Color[] {
    let memo: Color[] = [];

    for (let i = 0; i < this.gradientCount; i++) {
      let stepCount = this.substepCount;
      if (this.remainder > 0) {
        stepCount++;
        this.remainder = this.remainder - 1;
      }
      memo = memo.concat(
        this.gradientFor(this.colors[i], this.colors[i + 1], stepCount)
      );
    }

    const lastColor = this.colors[this.colors.length - 1];
    memo.push(lastColor);

    return memo;
  }

  // Calculate a single color-to-color gradient
  gradientFor(color1: Color, color2: Color, stepCount: number) {
    const gradient = [];

    for (let i = 0; i < stepCount; i++) {
      const ratio = i / stepCount;
      const r = color2[0] * ratio + color1[0] * (1 - ratio);
      const g = color2[1] * ratio + color1[1] * (1 - ratio);
      const b = color2[2] * ratio + color1[2] * (1 - ratio);

      gradient.push([r, g, b]);
    }

    return gradient;
  }
}

export default ColorGradient;
