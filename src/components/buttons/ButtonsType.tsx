import React from 'react';
import { Tab } from '@headlessui/react';

interface ButtonsProps {
  startPomodoro: () => void;
  startBreak: (boolean: boolean) => void;
  isBreak: boolean;
  isLongBreak: boolean;
}

const ButtonsType: React.FC<ButtonsProps> = ({
  startPomodoro,
  startBreak,
  isBreak,
  isLongBreak,
}) => {
  return (
    // <div className="flex flex-row justify-center items-center">
    <div className="w-full flex items-center justify-center mb-2">
      <div className="w-full max-w-xl sm:px-0">
        <Tab.Group
          onChange={(index: number) => {
            if (index === 0) {
              startPomodoro();
            } else if (index === 1) {
              startBreak(false);
            } else {
              startBreak(true);
            }
          }}
          defaultIndex={!isBreak ? 0 : !isLongBreak ? 1 : 2}
        >
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={`w-full py-2.5 text-xl leading-5 font-bold text-blue-700 rounded-lg
                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                ${
                  !isBreak
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`}
            >
              Pomodoro
            </Tab>
            <Tab
              className={`w-full py-2.5 text-xl leading-5 font-bold text-blue-700 rounded-lg
                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                ${
                  isBreak && !isLongBreak
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`}
            >
              Short Break
            </Tab>
            <Tab
              className={`w-full py-2.5 text-xl leading-5 font-bold text-blue-700 rounded-lg
                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                ${
                  isBreak && isLongBreak
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`}
            >
              Long Break
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ButtonsType;
