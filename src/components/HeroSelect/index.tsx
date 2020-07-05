import React from "react";
import {
  Hero,
  HeroFirstSeasons,
  HeroesByRole,
  HeroesByType,
  HeroRole
} from "../../models/Hero";
import Season from "../../models/Season";
import HeroCheckboxList from "../HeroCheckboxList";
import RoleImage from "../RoleImage";
import "./HeroSelect.css";
import HeroGroupHeader from "./HeroGroupHeader";

interface Props {
  role: HeroRole | null;
  season: Season;
  heroes: string;
  onToggle: (hero: Hero, isSelected: boolean) => void;
  theme: string;
}

const HeroSelect = ({ role, season, heroes, onToggle, theme }: Props) => {
  const getUnavailableReason = (hero: Hero) => {
    if ((HeroFirstSeasons[hero] || 1) > season.number) {
      return "Not available in this season";
    }
    if (role && !HeroesByRole[role].includes(hero)) {
      return `Not a ${role.toLowerCase()} hero`;
    }
    return;
  };

  const isChecked = (hero: Hero) => {
    const heroList = heroes.split(",").map(str => str.trim());
    return heroList.indexOf(hero) > -1;
  };

  const isRoleUnavailable = (displayedRole: string) =>
    typeof role === "string" &&
    role.length > 0 &&
    role.toLowerCase() !== displayedRole;

  const damageAvailable = !isRoleUnavailable("damage");
  const tankAvailable = !isRoleUnavailable("tank");
  const supportAvailable = !isRoleUnavailable("support");
  const allRolesAvailable =
    damageAvailable && tankAvailable && supportAvailable;
  const headerMarginTop = allRolesAvailable ? 4 : 3;
  const headerMarginRight = allRolesAvailable ? 0 : 4;

  const defenseHeroes = (
    <>
      <HeroGroupHeader mt={headerMarginTop} roleUnavailable={!damageAvailable}>
        <RoleImage theme={theme} role="damage" size={12} mr={1} />
        Defense
      </HeroGroupHeader>
      <HeroCheckboxList
        theme={theme}
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
            <HeroGroupHeader mr={headerMarginRight}>
              <RoleImage theme={theme} role="damage" size={12} mr={1} />
              Flankers
            </HeroGroupHeader>
            <HeroCheckboxList
              theme={theme}
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
            <HeroGroupHeader mt={headerMarginTop} mr={headerMarginRight}>
              <RoleImage theme={theme} role="tank" size={12} mr={1} />
              Off-tanks
            </HeroGroupHeader>
            <HeroCheckboxList
              theme={theme}
              heroes={HeroesByType["Off-tank"]}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
        {supportAvailable && (
          <>
            <HeroGroupHeader mt={headerMarginTop} mr={headerMarginRight}>
              <RoleImage theme={theme} role="support" size={12} mr={1} />
              Off-healers
            </HeroGroupHeader>
            <HeroCheckboxList
              theme={theme}
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
            <HeroGroupHeader mr={headerMarginRight}>
              <RoleImage theme={theme} role="damage" size={12} mr={1} />
              Hitscan
            </HeroGroupHeader>
            <HeroCheckboxList
              theme={theme}
              heroes={HeroesByType.Hitscan}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
        {tankAvailable && (
          <>
            <HeroGroupHeader mt={headerMarginTop}>
              <RoleImage theme={theme} role="tank" size={12} mr={1} />
              Main tanks
            </HeroGroupHeader>
            <HeroCheckboxList
              theme={theme}
              heroes={HeroesByType["Main Tank"]}
              getUnavailableReason={getUnavailableReason}
              isChecked={isChecked}
              onToggle={onToggle}
            />
          </>
        )}
        {supportAvailable && (
          <>
            <HeroGroupHeader mt={headerMarginTop}>
              <RoleImage theme={theme} role="support" size={12} mr={1} />
              Main healers
            </HeroGroupHeader>
            <HeroCheckboxList
              theme={theme}
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
          <HeroGroupHeader>
            <RoleImage theme={theme} role="damage" size={12} mr={1} />
            DPS
          </HeroGroupHeader>
          <HeroCheckboxList
            theme={theme}
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
