import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useGroup } from '../../hooks/useGroup';
import { useSettings } from '../../hooks/useSettings';
import { notification } from '../../utils/notification';
import {
  NotificationSettings,
  NotificationSettingsDefaultValues,
  PomodoroSettings,
  PomodoroSettingsDefaultValues,
  UserData,
} from '../../utils/types/userTypes';
import { useInterval } from '../../utils/useInterval';
import ButtonsControl from '../buttons/ButtonsControl';
import ButtonsType from '../buttons/ButtonsType';
import TimeDisplay from './TimeDisplay';
import { NextSeo } from 'next-seo';
import { extraDigit, formatTime } from '../../utils/formatTime';
import Head from 'next/head';
import { playNotification } from '../../utils/playNotification';

interface PomodoroProps {
  user: UserData | null;
  groupId: string | null;
  isGroup: boolean;
  isAdmin: boolean;
}

const Pomodoro: React.FC<PomodoroProps> = ({
  user,
  groupId,
  isGroup,
  isAdmin,
}) => {
  const {
    getGroupSettings,
    groupControl,
    getGroupCommands,
    updateGroupTime,
    getGroupTime,
  } = useGroup();
  const { getSettings, getNotificationSettings } = useSettings();
  const { updateTimeSpend, updatePomodoro } = useAuth();

  const [settings, setSettings] = useState<PomodoroSettings>(
    PomodoroSettingsDefaultValues
  );
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(NotificationSettingsDefaultValues);
  const [command, setCommand] = useState<string>('');
  const [justJoined, setJustJoined] = useState(true);

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

    if (user)
      getNotificationSettings(user.id, setNotificationSettings, isSubscribed);

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
    if (!isAdmin && isGroup && groupId) {
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
      if (groupId && justJoined) {
        setJustJoined(false);
        getGroupTime(groupId, setTime);
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

    if (groupId !== null && !isAdmin) {
      notification({
        title: 'The group admin has changed the settings',
        message: '',
        color: 'violet',
      });
    }
  }, [settings]);

  const sendTimeData = async () => {
    if (groupId) {
      if (time > 0 && started) await updateGroupTime(groupId, time - 1);
    }
  };

  const sendTimeSpend = () => {
    updateTimeSpend(fullPomodoroTime);
    setFullPomodoroTime(0);
  };

  useInterval(
    () => {
      setTime(time - 1);
      if (isPomodoro) setFullPomodoroTime(fullPomodoroTime + 1);
      if (isAdmin) sendTimeData();
      if (time === 1) playNotification(notificationSettings);
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

    if (isPomodoro) {
      if (groupId !== null && !isAdmin) {
        notification({
          title: 'Your group has started the Pomodoro Session',
          message: '',
          color: 'violet',
        });
      } else {
        notification({
          title: "You've started the Pomodoro Session",
          message: '',
          color: 'violet',
        });
      }
    }

    setTimeCounting(true);
    setStarted(true);
  }, [setTimeCounting, setStarted, sendCommand]);

  const startPomodoro = useCallback(async () => {
    await sendCommand('startPomodoro');

    if (groupId !== null && !isAdmin) {
      notification({
        title: 'Your group has started the Pomodoro Session',
        message: '',
        color: 'violet',
      });
    } else {
      notification({
        title: "You've started the Pomodoro Session",
        message: '',
        color: 'violet',
      });
    }

    if (settings.autoStartPomodoro) {
      startTimer();
    } else {
      setTimeCounting(false);
      setStarted(false);
    }

    setIsPomodoro(true);
    setIsBreak(false);
    setTime(5);
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
        notification({
          title: 'You are now on a long break',
          message: '',
          color: 'violet',
        });
      } else {
        setTime(settings.shortBreak);
        setIsLongBreak(false);
        notification({
          title: 'You are now on a short break',
          message: '',
          color: 'violet',
        });
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

    if (groupId !== null && !isAdmin) {
      notification({
        title: 'The group admin reset the timer',
        message: '',
        color: 'violet',
      });
    } else {
      notification({
        title: "You've reset the timer",
        message: '',
        color: 'violet',
      });
    }

    if (isPomodoro) {
      setTime(settings.pomodoro);
      sendTimeSpend();
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

    if (isPomodoro) {
      if (cyclesQtdManager.length > 0) {
        startBreak(false);
        cyclesQtdManager.pop();
      } else if (cyclesQtdManager.length <= 0) {
        startBreak(true);
        setCyclesQtdManager(
          new Array(settings.longBreakInterval - 1).fill(true)
        );
        setCompletedCycles(completedCycles + 1);
      }
      sendTimeSpend();
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

    if (isPomodoro) {
      if (cyclesQtdManager.length > 0) {
        startBreak(false);
        cyclesQtdManager.pop();
      } else if (isPomodoro && cyclesQtdManager.length <= 0) {
        startBreak(true);
        setCyclesQtdManager(
          new Array(settings.longBreakInterval - 1).fill(true)
        );
        setCompletedCycles(completedCycles + 1);
      }
      setNumberOfPomodoros(numberOfPomodoros + 1);
      updatePomodoro();
      sendTimeSpend();
    }

    if (isBreak) startPomodoro();
  }, [time]);

  const convertedTime = formatTime(time, false);
  const timeTitle: string =
    extraDigit(convertedTime.minutes).toString() +
    ':' +
    extraDigit(convertedTime.seconds).toString();

  return (
    <>
      {started ? <NextSeo title={timeTitle} description="" /> : null}
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={isBreak ? `/favicon-break-32x32.png` : `/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={isBreak ? `/favicon-break-16x16.png` : `/favicon-16x16.png`}
        />
      </Head>
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
        notificationSettings={notificationSettings}
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

export default Pomodoro;
