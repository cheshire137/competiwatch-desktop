import React from "react";
import HeroCheckbox from "./HeroCheckbox";
import { Hero } from "../models/Hero";

interface Props {
  heroes: Hero[];
  theme: string;
  isChecked: (hero: Hero) => boolean;
  onToggle: (hero: Hero, isSelected: boolean) => void;
  getUnavailableReason: (hero: Hero) => string | undefined;
}

const HeroCheckboxList = ({
  heroes,
  getUnavailableReason,
  isChecked,
  onToggle,
  theme
}: Props) => (
  <>
    {heroes.map(hero => {
      const unavailableReason = getUnavailableReason(hero);
      return (
        <HeroCheckbox
          key={hero}
          theme={theme}
          isAvailable={typeof unavailableReason !== "string"}
          unavailableReason={unavailableReason}
          isChecked={isChecked(hero)}
          onToggle={onToggle}
          hero={hero}
        />
      );
    })}
  </>
);

export default HeroCheckboxList;
