import { useCallback, useEffect, useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import {
  UserData,
  PomodoroSettings,
  PomodoroSettingsDefaultValues,
} from '../../utils/types/userTypes';
import { useInterval } from '../../utils/useInterval';
import ButtonsControl from '../buttons/ButtonsControl';
import ButtonsType from '../buttons/ButtonsType';
import TimeDisplay from './TimeDisplay';

interface PomodoroProps {
  user: UserData | null;
}

const Pomodoro: React.FC<PomodoroProps> = ({ user }) => {
  const { getSettings } = useSettings();

  const [settings, setSettings] = useState<PomodoroSettings>(
    PomodoroSettingsDefaultValues
  );

  const [time, setTime] = useState(settings.pomodoro);
  const [timeCounting, setTimeCounting] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(settings.longBreakInterval - 1).fill(true)
  );
  const [started, setStarted] = useState(false);

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullPomodoroTime, setFullPomodoroTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  // automatically check db for updated settings
  useEffect(() => {
    let isSubscribed = true;
    if (user) {
      if (!isSubscribed) return;
      getSettings(user.id, setSettings, isSubscribed);
    }

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  useEffect(() => {
    if (timeCounting === false) {
      if (isPomodoro) {
        setTime(settings.pomodoro);
      } else if (isBreak && isLongBreak) {
        setTime(settings.longBreak);
      } else if (isBreak && !isLongBreak) {
        setTime(settings.shortBreak);
      }
    }
  }, [settings]);

  useInterval(
    () => {
      setTime(time - 1);
      if (isPomodoro) setFullPomodoroTime(fullPomodoroTime + 1);
    },
    timeCounting ? 1000 : null
  );

  const toggleTimeCounting = useCallback(async () => {
    setTimeCounting(!timeCounting);
  }, [setTimeCounting, timeCounting]);

  const startTimer = useCallback(() => {
    setTimeCounting(true);
    setStarted(true);
  }, [setTimeCounting, setStarted]);

  const startPomodoro = useCallback(() => {
    if (settings.autoStartPomodoro) {
      startTimer();
    } else {
      setTimeCounting(false);
      setStarted(false);
    }

    setIsPomodoro(true);
    setIsBreak(false);
    setTime(settings.pomodoro);
  }, [
    setTimeCounting,
    setIsPomodoro,
    setIsBreak,
    setTime,
    setStarted,
    startTimer,
    settings.pomodoro,
    settings.autoStartPomodoro,
  ]);

  const startBreak = useCallback(
    (long: boolean) => {
      if (settings.autoStartBreak) {
        startTimer();
      } else {
        setTimeCounting(false);
        setStarted(false);
      }

      setIsPomodoro(false);
      setIsBreak(true);

      if (long) {
        setTime(settings.longBreak);
        setIsLongBreak(true);
      } else {
        setTime(settings.shortBreak);
        setIsLongBreak(false);
      }
    },
    [
      setTimeCounting,
      setIsPomodoro,
      setIsBreak,
      setTime,
      setIsLongBreak,
      setStarted,
      startTimer,
      settings.longBreak,
      settings.shortBreak,
      settings.autoStartBreak,
    ]
  );

  const resetTimer = useCallback(() => {
    setTimeCounting(false);
    setStarted(false);

    if (isPomodoro) {
      setTime(settings.pomodoro);
    } else if (isBreak && isLongBreak) {
      setTime(settings.longBreak);
    } else if (isBreak && !isLongBreak) {
      setTime(settings.shortBreak);
    }
  }, [
    setTimeCounting,
    setStarted,
    isPomodoro,
    isBreak,
    isLongBreak,
    settings.pomodoro,
    settings.longBreak,
    settings.shortBreak,
  ]);

  const skipCurrent = useCallback(() => {
    setTimeCounting(false);
    setStarted(false);

    if (isPomodoro && cyclesQtdManager.length > 0) {
      startBreak(false);
      cyclesQtdManager.pop();
    } else if (isPomodoro && cyclesQtdManager.length <= 0) {
      startBreak(true);
      setCyclesQtdManager(new Array(settings.longBreakInterval - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (isBreak) startPomodoro();
  }, [
    setTimeCounting,
    startBreak,
    setCyclesQtdManager,
    setCompletedCycles,
    setStarted,
    isPomodoro,
    cyclesQtdManager,
  ]);

  useEffect(() => {
    if (time > 0) return;

    if (isPomodoro && cyclesQtdManager.length > 0) {
      startBreak(false);
      cyclesQtdManager.pop();
    } else if (isPomodoro && cyclesQtdManager.length <= 0) {
      startBreak(true);
      setCyclesQtdManager(new Array(settings.longBreakInterval - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (isPomodoro) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (isBreak) startPomodoro();
  }, [
    startBreak,
    setCyclesQtdManager,
    startPomodoro,
    isPomodoro,
    isBreak,
    time,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    settings.longBreakInterval,
  ]);

  return (
    <>
      <ButtonsType
        startPomodoro={startPomodoro}
        startBreak={startBreak}
        isBreak={isBreak}
        isLongBreak={isLongBreak}
        admin={true}
      />
      <TimeDisplay
        time={time}
        isBreak={isBreak}
        isLongBreak={isLongBreak}
        settings={settings}
      />
      <ButtonsControl
        toggleTimeCounting={toggleTimeCounting}
        resetTimer={resetTimer}
        skipCurrent={skipCurrent}
        timeCounting={timeCounting}
        startTimer={startTimer}
        started={started}
      />
    </>
  );
};

export default Pomodoro;
