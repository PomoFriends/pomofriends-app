import { formatTime, extraDigit } from '../../utils/formatTime';
import React from 'react';

interface StatisticsProps {
  completedCycles: number;
  fullPomodoroTime: number;
  numberOfPomodoros: number;
}

export const Statistics: React.FC<StatisticsProps> = ({
  completedCycles,
  fullPomodoroTime,
  numberOfPomodoros,
}) => {
  const convertedTime = formatTime(fullPomodoroTime, true);
  return (
    <div>
      <div>
        <p>Completed cycles: {completedCycles}</p>
        {convertedTime.hours ? (
          <p>
            Worked hours: {extraDigit(convertedTime.hours)} hours{' '}
            {extraDigit(convertedTime.minutes)} minutes{' '}
            {extraDigit(convertedTime.seconds)} seconds
          </p>
        ) : (
          <p>
            Worked hours: 00 hours {extraDigit(convertedTime.minutes)} minutes{' '}
            {extraDigit(convertedTime.seconds)} seconds
          </p>
        )}
        <p>Completed Pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
};
