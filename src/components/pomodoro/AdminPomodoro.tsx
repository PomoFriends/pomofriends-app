import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGroup } from '../../hooks/useGroup';
import {
  PomodoroSettings,
  PomodoroSettingsDefaultValues,
} from '../../utils/types/userTypes';
import { useInterval } from '../../utils/useInterval';
import ButtonsControl from '../buttons/ButtonsControl';
import ButtonsType from '../buttons/ButtonsType';
import TimeDisplay from './TimeDisplay';

interface AdminPomodoroProps {
  groupId: string;
}

const AdminPomodoro: React.FC<AdminPomodoroProps> = ({ groupId }) => {
  const { user } = useAuth();
  const { getGroupSettings, groupControl } = useGroup();

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

  const toggleTimeCounting = useCallback(async () => {
    if (timeCounting === false)
      await groupControl(groupId, 'toggleTimeCountingTrue');
    if (timeCounting === true)
      await groupControl(groupId, 'toggleTimeCountingFalse');
    setTimeCounting(!timeCounting);
  }, [setTimeCounting, groupControl, timeCounting]);

  const startTimer = useCallback(async () => {
    await groupControl(groupId, 'startTimer');
    setTimeCounting(true);
    setStarted(true);
  }, [setTimeCounting, setStarted, groupControl]);

  const startPomodoro = useCallback(async () => {
    await groupControl(groupId, 'startPomodoro');
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
    groupControl,
    settings.pomodoro,
    settings.autoStartPomodoro,
  ]);

  const startBreak = useCallback(
    async (long: boolean) => {
      if (long) {
        await groupControl(groupId, 'startLongBreak');
      } else {
        await groupControl(groupId, 'startShortBreak');
      }

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
      groupControl,
      settings.longBreak,
      settings.shortBreak,
      settings.autoStartBreak,
    ]
  );

  const resetTimer = useCallback(async () => {
    await groupControl(groupId, 'resetTimer');
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
    groupControl,
    isPomodoro,
    isBreak,
    isLongBreak,
    settings.pomodoro,
    settings.longBreak,
    settings.shortBreak,
  ]);

  const skipCurrent = useCallback(async () => {
    await groupControl(groupId, 'skipCurrent');
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
    groupControl,
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
        groupId={groupId}
        group={true}
        admin={true}
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

export default AdminPomodoro;
