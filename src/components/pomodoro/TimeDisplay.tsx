import { formatTime, extraDigit } from '../../utils/formatTime';
import React from 'react';

interface TimerProps {
  time: number;
  isBreak: boolean;
  isLongBreak: boolean;
}

const TimeDisplay: React.FC<TimerProps> = ({ time, isBreak, isLongBreak }) => {
  const convertedTime = formatTime(time, false);

  return (
    <>
      <div
        className={
          !isBreak
            ? 'bg-blue-400 shadow-md border border-gray-200 rounded-lg p-8'
            : !isLongBreak
            ? 'bg-teal-400 shadow-md border border-gray-200 rounded-lg p-8'
            : 'bg-green-500 shadow-md border border-gray-200 rounded-lg p-8'
        }
      >
        <p className="text-center font-bold text-white lg:text-9xl md:text-9xl sm:text-9xl">
          {extraDigit(convertedTime.minutes)}:
          {extraDigit(convertedTime.seconds)}
        </p>
      </div>
    </>
  );
};

export default TimeDisplay;
