import React from "react";
import { Box, Text } from "@primer/react";
import ChartSeasonNumber from "./ChartSeasonNumber";

interface Props {
  title: string;
  seasonNumber: number;
}

const ChartHeader = ({ title, seasonNumber }: Props) => (
  <Box display="flex" mb={2} justifyContent="center" alignItems="center">
    <Text fontWeight="bold" fontSize={3}>
      {title}
    </Text>
    <ChartSeasonNumber>Season {seasonNumber}</ChartSeasonNumber>
  </Box>
);

export default ChartHeader;
