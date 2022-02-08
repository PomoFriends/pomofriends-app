import React, { useEffect, useState } from 'react';

const Timer: React.FC = (): JSX.Element => {
  const [time, setTime] = useState(1500);
  const [play, setPlay] = useState(false);
  //   const [timeType, setTimeType] = useState(0);

  const startTimerPomodoro = () => {
    const defaultTime = 1500;

    setTime(defaultTime);
    // setTimeType(0);
    setPlay(true);
  };

  const pauseTimer = () => {
    if (play) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (play) {
        setTime(time - 1);
        console.log(time);
      }
      console.log(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, setTime, play]);

  return (
    <div className="flex rounded-lg p-24 justify-center">
      Home page{' '}
      <button
        onClick={() => {
          startTimerPomodoro();
        }}
      >
        Start timer
      </button>
      <br />
      <button
        onClick={() => {
          pauseTimer();
        }}
      >
        Pause timer
      </button>
    </div>
  );
};

export default Timer;
