import React, { useState, useEffect } from "react";
import Season from "../models/Season";
import LoadingPage from "./LoadingPage";

interface Props {
  activeSeason: Season;
  onSeasonChange: (season: Season) => void;
}

const SeasonSelect = ({ activeSeason, onSeasonChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seasons, setSeasons] = useState<Season[] | null>(null);

  useEffect(() => {
    async function getSeasons() {
      const allSeasons = await Season.findAll();
      console.log(allSeasons);
      setSeasons(allSeasons);
    }

    if (seasons === null) {
      getSeasons();
    }
  });

  if (seasons === null) {
    return <LoadingPage />;
  }

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

  const seasonButtonClass = (seasonNumber: number) => {
    const classes = ["select-menu-item", "text-left", "width-full", "btn-link"];
    if (activeSeason.number === seasonNumber) {
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
                  className={seasonButtonClass(season.number)}
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
