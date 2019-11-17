import React from 'react';
import { TimeOfDay } from "../models/DayTimeApproximator";

interface Props {
  timeOfDay: TimeOfDay;
}

const TimeOfDayEmoji = ({ timeOfDay }: Props) => {
  if (timeOfDay === 'morning') {
    return <span role="img" aria-label="Morning">🌅</span>;
  }

  if (timeOfDay === 'evening') {
    return <span role="img" aria-label="Evening">🌆</span>;
  }

  if (timeOfDay === 'afternoon') {
    return <span role="img" aria-label="Afternoon">😎</span>;
  }

  return <span role="img" aria-label="Night">🌝</span>;
};

export default TimeOfDayEmoji;
