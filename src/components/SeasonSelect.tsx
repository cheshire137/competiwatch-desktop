import React, { useState } from "react";

const getSeasonsList = (latestSeason: number) => {
  const seasons = [];
  for (let season = latestSeason; season >= 1; season--) {
    seasons.push(season);
  }
  return seasons;
};

interface Props {
  latestSeason: number;
  activeSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  onSeasonChange: (season: number) => void;
}

const SeasonSelect = ({
  latestSeason,
  activeSeason,
  onPageChange,
  onSeasonChange
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const seasons = getSeasonsList(latestSeason);

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

  const seasonButtonClass = (season: number) => {
    const classes = ["select-menu-item", "text-left", "width-full", "btn-link"];
    if (activeSeason === season) {
      classes.push("selected");
    }
    return classes.join(" ");
  };

  const onChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.currentTarget;
    const season = parseInt(button.value, 10);

    button.blur();
    onSeasonChange(season);
    setIsOpen(false);
  };

  const manageSeasons = () => {
    setIsOpen(false);
    onPageChange("manage-seasons");
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
          Season {activeSeason}
        </button>
        <div className="select-menu-modal-holder">
          <div className="select-menu-modal">
            <div className="select-menu-list">
              {seasons.map(season => (
                <button
                  className={seasonButtonClass(season)}
                  key={season}
                  type="button"
                  value={season}
                  onClick={onChange}
                >
                  <span className="ion ion-ios-checkmark select-menu-item-icon" />
                  <span className="select-menu-item-text">Season {season}</span>
                </button>
              ))}
              <button
                className="select-menu-item text-bold text-left width-full btn-link"
                type="button"
                onClick={manageSeasons}
              >
                <span className="ion ion-ios-checkmark select-menu-item-icon" />
                <span className="select-menu-item-text">Manage seasons</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonSelect;
