import React from "react";
import {
  Hero,
  HeroFirstSeasons,
  HeroesByRole,
  HeroesByType,
  HeroRole
} from "../../models/Hero";
import HeroCheckboxList from "../HeroCheckboxList";
import RoleImage from "../RoleImage";
import "./HeroSelect.css";

interface Props {
  role: HeroRole;
  season: number;
  heroes: string;
  onToggle: (hero: Hero, isSelected: boolean) => void;
  theme: string;
}

const HeroSelect = ({ role, season, heroes, onToggle, theme }: Props) => {
  const getUnavailableReason = (hero: Hero) => {
    if ((HeroFirstSeasons[hero] || 1) > season) {
      return "Not available in this season";
    }
    if (!HeroesByRole[role].includes(hero)) {
      return `Not a ${role.toLowerCase()} hero`;
    }
    return;
  };

  const isChecked = (hero: Hero) => {
    const heroList = heroes.split(",").map(str => str.trim());
    return heroList.indexOf(hero) > -1;
  };

  const unavailableClass = (displayedRole: string) => {
    if (
      typeof role === "string" &&
      role.length > 0 &&
      role.toLowerCase() !== displayedRole
    ) {
      return "role-unavailable";
    }
  };

  const damageUnavailableClass = unavailableClass("damage");
  const tankUnavailableClass = unavailableClass("tank");
  const supportUnavailableClass = unavailableClass("support");
  const damageAvailable = typeof damageUnavailableClass !== "string";
  const tankAvailable = typeof tankUnavailableClass !== "string";
  const supportAvailable = typeof supportUnavailableClass !== "string";
  const allRolesAvailable =
    damageAvailable && tankAvailable && supportAvailable;
  const verticalSpacingClass = allRolesAvailable ? "mt-4" : "";
  const horizontalSpacingClass = allRolesAvailable ? "" : "mr-4";

  const defenseHeroes = (
    <>
      <h5
        className={`h5 border-bottom pb-1 ${
          allRolesAvailable ? "" : "mt-3"
        } ${verticalSpacingClass} mb-2 ${damageUnavailableClass}`}
      >
        <RoleImage
          theme={theme}
          role="damage"
          size={12}
          className="d-inline-block mr-1"
        />
        Defense
      </h5>
      <HeroCheckboxList
        heroes={HeroesByType.Defense}
        getUnavailableReason={getUnavailableReason}
        isChecked={isChecked}
        onToggle={onToggle}
      />
    </>
  );

  return (
    <div
      className={`d-flex flex-wrap ${
        allRolesAvailable ? "flex-justify-between" : "flex-justify-start"
      }`}
    >
      <div className="hero-box mb-3">
        {damageAvailable && (
          <>
            <h5
              className={`h5 border-bottom ${horizontalSpacingClass} pb-1 mb-2 ${damageUnavailableClass}`}
            >
              <RoleImage
                theme={theme}
                role="damage"
                size={12}
                className="d-inline-block mr-1"
              />
              Flankers
            </h5>
            <HeroCheckboxList
              heroes={HeroesByType.Flanker}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
            {!allRolesAvailable && defenseHeroes}
          </>
        )}
        {tankAvailable && (
          <>
            <h5
              className={`h5 border-bottom pb-1 ${horizontalSpacingClass} ${verticalSpacingClass} mb-2 ${tankUnavailableClass}`}
            >
              <RoleImage
                theme={theme}
                role="tank"
                size={12}
                className="d-inline-block mr-1"
              />
              Off-tanks
            </h5>
            <HeroCheckboxList
              heroes={HeroesByType["Off-tank"]}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
        {supportAvailable && (
          <>
            <h5
              className={`h5 border-bottom pb-1 ${horizontalSpacingClass} ${verticalSpacingClass} mb-2 ${supportUnavailableClass}`}
            >
              <RoleImage
                theme={theme}
                role="support"
                size={12}
                className="d-inline-block mr-1"
              />
              Off-healers
            </h5>
            <HeroCheckboxList
              heroes={HeroesByType["Off-healer"]}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
      </div>
      <div className="hero-box mb-3">
        {damageAvailable && (
          <>
            <h5
              className={`h5 border-bottom pb-1 ${horizontalSpacingClass} mb-2 ${damageUnavailableClass}`}
            >
              <RoleImage
                theme={theme}
                role="damage"
                size={12}
                className="d-inline-block mr-1"
              />
              Hitscan
            </h5>
            <HeroCheckboxList
              heroes={HeroesByType.Hitscan}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
        {tankAvailable && (
          <>
            <h5
              className={`h5 border-bottom pb-1 ${verticalSpacingClass} mb-2 ${tankUnavailableClass}`}
            >
              <RoleImage
                theme={theme}
                role="tank"
                size={12}
                className="d-inline-block mr-1"
              />
              Main tanks
            </h5>
            <HeroCheckboxList
              heroes={HeroesByType["Main Tank"]}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
        {supportAvailable && (
          <>
            <h5
              className={`h5 border-bottom pb-1 mb-2 ${verticalSpacingClass} ${supportUnavailableClass}`}
            >
              <RoleImage
                theme={theme}
                role="support"
                size={12}
                className="d-inline-block mr-1"
              />
              Main healers
            </h5>
            <HeroCheckboxList
              heroes={HeroesByType["Main Healer"]}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
      </div>
      {damageAvailable && (
        <div className="hero-box mb-3">
          <h5
            className={`h5 border-bottom pb-1 mb-2 ${damageUnavailableClass}`}
          >
            <RoleImage
              theme={theme}
              role="damage"
              size={12}
              className="d-inline-block mr-1"
            />
            DPS
          </h5>
          <HeroCheckboxList
            heroes={HeroesByType.DPS}
            getUnavailableReason={getUnavailableReason}
            isChecked={isChecked}
            onToggle={onToggle}
          />
          {allRolesAvailable && defenseHeroes}
        </div>
      )}
    </div>
  );
};

export default HeroSelect;
