class HeroUtil {
  static slugify(hero: string): string {
    if (hero === "D.Va") {
      return "dva";
    }
    if (hero === "Lúcio") {
      return "lucio";
    }
    if (hero === "Soldier: 76") {
      return "soldier76";
    }
    if (hero === "Torbjörn") {
      return "torbjorn";
    }
    if (hero === "Wrecking Ball") {
      return "wrecking-ball";
    }
    if (hero === "Junker Queen") {
      return "junker-queen";
    }
    if (hero === "McCree") {
      return "cassidy";
    }
    return hero.toLowerCase();
  }
}

export default HeroUtil;
