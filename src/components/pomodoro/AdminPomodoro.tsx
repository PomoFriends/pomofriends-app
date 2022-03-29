import { useCallback, useEffect, useState } from 'react';
import { useGroup } from '../../hooks/useGroup';
import { useSettings } from '../../hooks/useSettings';
import {
  PomodoroSettings,
  PomodoroSettingsDefaultValues,
  UserData,
} from '../../utils/types/userTypes';
import { useInterval } from '../../utils/useInterval';
import ButtonsControl from '../buttons/ButtonsControl';
import ButtonsType from '../buttons/ButtonsType';
import TimeDisplay from './TimeDisplay';

interface AdminPomodoroProps {
  user: UserData | null;
  groupId: string | null;
  isGroup: boolean;
  isAdmin: boolean;
}

const AdminPomodoro: React.FC<AdminPomodoroProps> = ({
  user,
  groupId,
  isGroup,
  isAdmin,
}) => {
  const { getGroupSettings, groupControl, getGroupCommands } = useGroup();
  const { getSettings } = useSettings();

  const [settings, setSettings] = useState<PomodoroSettings>(
    PomodoroSettingsDefaultValues
  );
  const [command, setCommand] = useState<string>('');

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

  const sendCommand = async (commandName: string) => {
    if (isAdmin && isGroup && groupId) await groupControl(groupId, commandName);
  };

  // Automatically check db for updated settings
  useEffect(() => {
    let isSubscribed = true;

    // Get user settings
    if (user && !isGroup) getSettings(user.id, setSettings, isSubscribed);

    // Get group settings
    if (isGroup && groupId)
      getGroupSettings(groupId, setSettings, isSubscribed);

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  // automatically check db for updated commands if not an admin
  useEffect(() => {
    if (!isAdmin && isGroup && groupId) {
      let isSubscribed = true;

      getGroupCommands(groupId, setCommand, isSubscribed);

      return () => {
        isSubscribed = false;
      };
    }
  }, []);

  // Execute recieved command | if not admin
  useEffect(() => {
    if (!isAdmin && isGroup) {
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
    }
  }, [command]);

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
    if (timeCounting === false) await sendCommand('toggleTimeCountingTrue');
    else await sendCommand('toggleTimeCountingFalse');

    setTimeCounting(!timeCounting);
  }, [setTimeCounting, sendCommand, timeCounting]);

  const startTimer = useCallback(async () => {
    await sendCommand('startTimer');

    setTimeCounting(true);
    setStarted(true);
  }, [setTimeCounting, setStarted, sendCommand]);

  const startPomodoro = useCallback(async () => {
    await sendCommand('startPomodoro');

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
    sendCommand,
    settings.pomodoro,
    settings.autoStartPomodoro,
  ]);

  const startBreak = useCallback(
    async (long: boolean) => {
      if (long) {
        await sendCommand('startLongBreak');
      } else {
        await sendCommand('startShortBreak');
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
      sendCommand,
      settings.longBreak,
      settings.shortBreak,
      settings.autoStartBreak,
    ]
  );

  const resetTimer = useCallback(async () => {
    await sendCommand('resetTimer');
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
    sendCommand,
    isPomodoro,
    isBreak,
    isLongBreak,
    settings.pomodoro,
    settings.longBreak,
    settings.shortBreak,
  ]);

  const skipCurrent = useCallback(async () => {
    await sendCommand('skipCurrent');
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
    sendCommand,
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
  }, [time]);

  return (
    <>
      <ButtonsType
        startPomodoro={startPomodoro}
        startBreak={startBreak}
        isBreak={isBreak}
        isLongBreak={isLongBreak}
        admin={isAdmin}
      />
      <TimeDisplay
        time={time}
        isBreak={isBreak}
        isLongBreak={isLongBreak}
        settings={settings}
        groupId={groupId}
        admin={isAdmin}
      />
      <ButtonsControl
        toggleTimeCounting={toggleTimeCounting}
        resetTimer={resetTimer}
        skipCurrent={skipCurrent}
        timeCounting={timeCounting}
        startTimer={startTimer}
        started={started}
        admin={isAdmin}
      />
    </>
  );
};

export default AdminPomodoro;
