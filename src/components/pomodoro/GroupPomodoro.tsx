import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGroup } from '../../hooks/useGroup';
import {
  PomodoroSettings,
  PomodoroSettingsDefaultValues,
} from '../../utils/types/userTypes';
import { useInterval } from '../../utils/useInterval';
import ButtonsType from '../buttons/ButtonsType';
import TimeDisplay from './TimeDisplay';

interface GroupPomodoroProps {
  groupId: string;
  adminId: string;
}

const GroupPomodoro: React.FC<GroupPomodoroProps> = ({ groupId }) => {
  const { user } = useAuth();
  const { getGroupSettings, getGroupCommands } = useGroup();

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

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullPomodoroTime, setFullPomodoroTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const [command, setCommand] = useState<string>('');

  // automatically check db for updated commands
  useEffect(() => {
    let isSubscribed = true;

    getGroupCommands(groupId, setCommand, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (command === 'startPomodoro') {
      startPomodoro();
    } else if (command === 'startShortBreak') {
      startBreak(false);
    } else if (command === 'startLongBreak') {
      startBreak(true);
    } else if (command === 'toggleTimeCountingTrue') {
      setTimeCounting(true);
    } else if (command === 'toggleTimeCountingFalse') {
      setTimeCounting(false);
    } else if (command === 'resetTimer') {
      resetTimer();
    } else if (command === 'skipCurrent') {
      skipCurrent();
    } else if (command === 'startTimer') {
      startTimer();
    }
  }, [command]);

  // automatically check db for updated settings
  useEffect(() => {
    let isSubscribed = true;

    getGroupSettings(groupId, setSettings, isSubscribed);

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

  const startTimer = useCallback(() => {
    setTimeCounting(true);
  }, [setTimeCounting]);

  const startPomodoro = useCallback(() => {
    if (settings.autoStartPomodoro) {
      startTimer();
    } else {
      setTimeCounting(false);
    }

    setIsPomodoro(true);
    setIsBreak(false);
    setTime(settings.pomodoro);
  }, [
    setTimeCounting,
    setIsPomodoro,
    setIsBreak,
    setTime,
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
      startTimer,
      settings.longBreak,
      settings.shortBreak,
      settings.autoStartBreak,
    ]
  );

  const resetTimer = useCallback(() => {
    setTimeCounting(false);

    if (isPomodoro) {
      setTime(settings.pomodoro);
    } else if (isBreak && isLongBreak) {
      setTime(settings.longBreak);
    } else if (isBreak && !isLongBreak) {
      setTime(settings.shortBreak);
    }
  }, [
    setTimeCounting,
    isPomodoro,
    isBreak,
    isLongBreak,
    settings.pomodoro,
    settings.longBreak,
    settings.shortBreak,
  ]);

  const skipCurrent = useCallback(() => {
    setTimeCounting(false);

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
      />
      <TimeDisplay
        time={time}
        isBreak={isBreak}
        isLongBreak={isLongBreak}
        settings={settings}
        group={true}
      />
    </>
  );
};

export default GroupPomodoro;
