import React from 'react';

interface Props {
  dayOfWeek: "weekend" | "weekday";
}

const DayOfWeekEmoji = ({ dayOfWeek }: Props) => {
  if (dayOfWeek === 'weekend') {
    return <span role="img" aria-label="Weekend">🎉</span>;
  }

  return <span role="img" aria-label="Weekday">👔</span>;
};

export default DayOfWeekEmoji;
