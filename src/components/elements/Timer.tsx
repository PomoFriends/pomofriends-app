import React from 'react';
import { secondsToTimeString } from '../../utils/secondsToTimeString';

interface TimerProps {
  time: number;
}

const ShowTimer = ({ time }: TimerProps): JSX.Element => {
  const timer = secondsToTimeString(time);

  return <div>{timer}</div>;
};

export default ShowTimer;
