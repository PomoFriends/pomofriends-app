import React from 'react';
import { Button } from './ButtonPomodoro';

interface ButtonsProps {
  setTimeCounting: (boolean: boolean) => void;
  resetTimer: () => void;
  skipCurrent: () => void;
  startTimer: () => void;
  timeCounting: boolean;
  started: boolean;
}

const ButtonsControl: React.FC<ButtonsProps> = ({
  setTimeCounting,
  resetTimer,
  skipCurrent,
  startTimer,
  timeCounting,
  started,
}) => {
  return (
    <div className="flex flex-row justify-center items-center">
      {started ? (
        <Button
          text="Reset"
          onClick={() => resetTimer()}
          className="bg-yellow-500 hover:bg-yellow-700 w-20"
        />
      ) : null}

      <Button
        text={!started ? 'Start' : timeCounting ? 'Stop' : 'Resume'}
        onClick={() => {
          if (!started) {
            startTimer();
          } else {
            setTimeCounting(!timeCounting);
          }
        }}
        className="mx-3 w-48 bg-blue-500 hover:bg-blue-700"
      />
      {started ? (
        <Button
          text="Skip"
          onClick={() => skipCurrent()}
          className="bg-purple-500 hover:bg-purple-700 w-20"
        />
      ) : null}
    </div>
  );
};

export default ButtonsControl;
