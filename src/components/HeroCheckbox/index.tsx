import React from "react";
import HeroImage from "../HeroImage";
import HeroUtil from "../../models/HeroUtil";
import "./HeroCheckbox.css";
import { Hero } from "../../models/Hero";

interface Props {
  isAvailable: boolean;
  hero: Hero;
  isChecked: boolean;
  theme: string;
  unavailableReason?: string;
  onToggle: (hero: Hero, isSelected: boolean) => void;
}

const HeroCheckbox = ({
  isAvailable,
  hero,
  onToggle,
  unavailableReason,
  isChecked,
  theme
}: Props) => {
  const containerClass = () => {
    let classes = ["form-checkbox", "mb-0", "mt-1"];
    if (!isAvailable) {
      classes = classes.concat([
        "tooltipped",
        "tooltipped-n",
        "unavailable-hero"
      ]);
    }
    return classes.join(" ");
  };

  const labelClass = () => {
    const classes = ["d-flex", "flex-items-center"];
    if (!isAvailable) {
      classes.push("disabled");
    }
    return classes.join(" ");
  };

  const slug = HeroUtil.slugify(hero);

  const nameClass = () => {
    const classes = [`text-${slug}`, "hero-name"];
    return classes.join(" ");
  };

  const domID = `hero-${slug}`;

  return (
    <div className={containerClass()} aria-label={unavailableReason}>
      <label htmlFor={domID} className={labelClass()}>
        <input
          disabled={!isAvailable}
          checked={isChecked}
          value={hero}
          id={domID}
          onChange={evt => onToggle(hero, evt.target.checked)}
          type="checkbox"
        />
        <HeroImage
          hero={hero}
          className="d-inline-block rounded-2 flex-shrink-0 mx-2"
        />
        <div className="no-wrap">
          <span className={nameClass()}>{hero}</span>
        </div>
      </label>
    </div>
  );
};

export default HeroCheckbox;
