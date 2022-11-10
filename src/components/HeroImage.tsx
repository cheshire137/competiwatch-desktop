import React from "react";
import HeroUtil from "../models/HeroUtil";
import HeroImageTag from "./HeroImageTag";

const knownHeroes = [
  "ana",
  "ashe",
  "baptiste",
  "bastion",
  "brigitte",
  "cassidy",
  "doomfist",
  "dva",
  "echo",
  "genji",
  "hanzo",
  "junker-queen",
  "junkrat",
  "kiriko",
  "lucio",
  "mei",
  "mercy",
  "moira",
  "orisa",
  "pharah",
  "reaper",
  "reinhardt",
  "roadhog",
  "sigma",
  "sojourn",
  "soldier76",
  "sombra",
  "symmetra",
  "torbjorn",
  "tracer",
  "widowmaker",
  "winston",
  "wrecking-ball",
  "zarya",
  "zenyatta"
];

interface Props {
  hero: string;
  className?: string;
  size?: number;
}

const HeroImage = ({ hero, className, size }: Props) => {
  const slug = HeroUtil.slugify(hero);
  if (knownHeroes.indexOf(slug) < 0) {
    return <span>{hero}</span>;
  }

  const src = require(`../images/heroes/${slug}.png`);

  return (
    <HeroImageTag
      src={src}
      alt={hero}
      className={className}
      width={size || 20}
      height={size || 20}
    />
  );
};

export default HeroImage;
