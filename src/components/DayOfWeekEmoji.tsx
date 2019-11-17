import React from 'react';
import { DayOfWeek } from "../models/DayTimeApproximator";

interface Props {
  dayOfWeek: DayOfWeek;
}

const DayOfWeekEmoji = ({ dayOfWeek }: Props) => {
  if (dayOfWeek === 'weekend') {
    return <span role="img" aria-label="Weekend">🎉</span>;
  }

  return <span role="img" aria-label="Weekday">👔</span>;
};

export default DayOfWeekEmoji;
