import React, { useState, useEffect } from "react";
import Season from "../models/Season";
import LoadingPage from "./LoadingPage";

interface Props {
  activeSeason: Season;
  seasons: Season[];
  onSeasonChange: (season: Season) => void;
}

const SeasonSelect = ({ activeSeason, seasons, onSeasonChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerClass = () => {
    const classes = ["select-menu", "d-inline-block"];
    if (isOpen) {
      classes.push("active");
    }
    return classes.join(" ");
  };

  const toggleButtonClass = () => {
    const classes = ["btn", "select-menu-button"];
    if (isOpen) {
      classes.push("selected");
    }
    return classes.join(" ");
  };

  const seasonButtonClass = (season: Season) => {
    const classes = ["select-menu-item", "text-left", "width-full", "btn-link"];
    if (activeSeason.equals(season)) {
      classes.push("selected");
    }
    return classes.join(" ");
  };

  const onChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, season: Season) => {
    event.currentTarget.blur();
    onSeasonChange(season);
    setIsOpen(false);
  };

  return (
    <div className="mr-2 my-2">
      <div className={containerClass()}>
        <button
          className={toggleButtonClass()}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded="false"
        >
          Season {activeSeason.number} ({activeSeason.description()})
        </button>
        <div className="select-menu-modal-holder">
          <div className="select-menu-modal">
            <div className="select-menu-list">
              {seasons.map(season => (
                <button
                  className={seasonButtonClass(season)}
                  key={season.numberAndOpenQueue}
                  type="button"
                  onClick={e => onChange(e, season)}
                >
                  <span className="ion ion-ios-checkmark select-menu-item-icon" />
                  <span className="select-menu-item-text">
                    Season {season.number} ({season.description()})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonSelect;
