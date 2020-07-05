import React, { useState } from "react";
import Season from "../models/Season";
import { Button, Box, Flex, TextInput } from "@primer/components";
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
  const [openQueue, setOpenQueue] = useState(
    latestSeason.openQueue || latestSeason.number < Season.roleQueueSeasonStart
  );

  const saveSeason = async () => {
    if (!isValid) {
      return;
    }

    const seasonNumber = parseInt(season, 10);
    const newSeason = new Season({ number: seasonNumber, openQueue: openQueue });
    await newSeason.save();
    const seasons = await Season.findAll();

    setSeason("");
    onCreate(newSeason, seasons);
  };

  const checkValidity = async (
    numberStr: string,
    roleQueueChecked: boolean
  ) => {
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
    if (
      !roleQueueChecked &&
      newNumberValue >= Season.roleQueueSeasonStart &&
      newNumberValue < Season.openQueueSeasonStart
    ) {
      setIsValid(false);
      return;
    }

    const seasonAlreadyExists = await Season.exists(
      newNumberValue,
      newOpenQueueValue
    );
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

  const onOpenQueueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const openQueueChecked = event.target.checked;
    setOpenQueue(openQueueChecked);
    checkValidity(season, !openQueueChecked);
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
            min={Season.openQueueSeasonStart}
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
              type="radio"
              id="season-role-queue"
              checked={!openQueue}
              onChange={onRoleQueueChange}
            />
            <Box ml="1" mr={4} display="inline-block">
              Role queue
            </Box>
          </label>
          <label htmlFor="season-open-queue">
            <input
              type="radio"
              id="season-open-queue"
              checked={openQueue}
              onChange={onOpenQueueChange}
            />
            <Box ml="1" display="inline-block">
              Open queue
            </Box>
          </label>
        </Box>
      </form>
      {latestSeasonCanBeDeleted && (
        <SeasonDeleteForm season={latestSeason} onDelete={onDelete} />
      )}
    </Box>
  );
};

export default SeasonForm;
