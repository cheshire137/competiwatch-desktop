import React from "react";
import { Flex, Text } from "@primer/components";
import ChartSeasonNumber from "./ChartSeasonNumber";

interface Props {
  title: string;
  seasonNumber: number;
}

const ChartHeader = ({ title, seasonNumber }: Props) => (
  <Flex mb={2} justifyContent="center" alignItems="center">
    <Text fontWeight="bold" fontSize={3}>{title}</Text>
    <ChartSeasonNumber>Season {seasonNumber}</ChartSeasonNumber>
  </Flex>
);

export default ChartHeader;
