import React, { useState } from "react";
import Season from "../models/Season";
import { Button, Box, TextInput } from "@primer/react";
import SeasonDeleteForm from "./SeasonDeleteForm";

interface Props {
  onCreate: (newSeason: Season, allSeasons: Season[]) => void;
  latestSeason: Season;
  onDelete: (season: Season, allSeasons: Season[]) => void;
  latestSeasonCanBeDeleted: boolean;
}

const SeasonForm = ({
  onCreate,
  latestSeason,
  onDelete,
  latestSeasonCanBeDeleted
}: Props) => {
  const [season, setSeason] = useState("");
  const [isValid, setIsValid] = useState(false);

  const saveSeason = async () => {
    if (!isValid) {
      return;
    }

    const seasonNumber = parseInt(season, 10);
    const newSeason = new Season({ number: seasonNumber });
    await newSeason.save();
    const seasons = await Season.findAll();

    setSeason("");
    onCreate(newSeason, seasons);
  };

  const checkValidity = async (numberStr: string) => {
    if (numberStr.length < 1) {
      setIsValid(false);
      return;
    }

    const newNumberValue = parseInt(numberStr, 10);

    const seasonAlreadyExists = await Season.exists(newNumberValue);
    setIsValid(!seasonAlreadyExists);
  };

  const onSeasonNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberStr = event.target.value;
    if (numberStr.length < 1) {
      setSeason(numberStr);
      setIsValid(false);
      return;
    }

    setSeason(numberStr);
    checkValidity(numberStr);
  };

  return (
    <Box mt={4}>
      <form
        onSubmit={evt => {
          evt.preventDefault();
          saveSeason();
        }}
      >
        <h2 className="h2 text-normal mb-2">Add a season</h2>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <label htmlFor="season-number">Number:</label>
          </Box>
          <TextInput
            id="season-number"
            type="number"
            value={season}
            onChange={onSeasonNumberChange}
            min={Season.openQueueSeasonStart}
            step="1"
            required
          />
          <Button type="submit" disabled={!isValid} ml={2}>
            Add season
          </Button>
        </Box>
      </form>
      {latestSeasonCanBeDeleted && (
        <SeasonDeleteForm season={latestSeason} onDelete={onDelete} />
      )}
    </Box>
  );
};

export default SeasonForm;
