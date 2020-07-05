import React, { useState } from "react";
import Season from "../models/Season";
import { Button, Box, Flex, TextInput } from "@primer/components";
import SeasonDeleteForm from "./SeasonDeleteForm";
import Note from "./Note";

interface Props {
  onCreate: (season: number) => void;
  latestSeason: number;
  onDelete: (season: number) => void;
  latestSeasonCanBeDeleted: boolean;
}

const SeasonForm = ({ onCreate, latestSeason, onDelete, latestSeasonCanBeDeleted }: Props) => {
  const [season, setSeason] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [openQueue, setOpenQueue] = useState(latestSeason < Season.roleQueueSeasonStart);

  const saveSeason = async () => {
    if (!isValid) {
      return;
    }

    const seasonNumber = parseInt(season, 10);
    await new Season({ number: seasonNumber }).save();

    setSeason("");
    onCreate(seasonNumber);
  };

  const checkValidity = async (numberStr: string, roleQueueChecked: boolean) => {
    if (numberStr.length < 1) {
      setIsValid(false);
      return;
    }

    const newNumberValue = parseInt(numberStr, 10);
    const newOpenQueueValue = !roleQueueChecked;

    // Check if role queue existed yet
    if (roleQueueChecked && newNumberValue < Season.roleQueueSeasonStart) {
      setIsValid(false);
      return;
    }

    // Check if open queue existed yet
    if (!roleQueueChecked && newNumberValue >= Season.roleQueueSeasonStart && newNumberValue < Season.openQueueSeasonStart) {
      setIsValid(false);
      return;
    }

    const seasonAlreadyExists = await Season.exists(newNumberValue, newOpenQueueValue);
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
    checkValidity(numberStr, !openQueue);
  };

  const onRoleQueueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleQueueChecked = event.target.checked;
    setOpenQueue(!roleQueueChecked);
    checkValidity(season, roleQueueChecked);
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
        <Flex alignItems="center">
          <Box mr={2}>
            <label htmlFor="season-number">Number:</label>
          </Box>
          <TextInput
            id="season-number"
            type="number"
            value={season}
            onChange={onSeasonNumberChange}
            min={latestSeason + 1}
            step="1"
            required
          />
          <Button type="submit" disabled={!isValid} ml={2}>
            Add season
          </Button>
        </Flex>
        <Box mt={2}>
          <label htmlFor="season-role-queue">
            <input
              type="checkbox"
              id="season-role-queue"
              checked={!openQueue}
              onChange={onRoleQueueChange}
            />
            <Box ml="1" display="inline-block">Role queue</Box>
          </label>
          <Note>Leave unchecked to create an open queue season.</Note>
        </Box>
      </form>
      {latestSeasonCanBeDeleted && (
        <SeasonDeleteForm seasonNumber={latestSeason} onDelete={onDelete} />
      )}
    </Box>
  );
};

export default SeasonForm;
