/** User type */
export type UserData = {
  id: string;
  username: string;
  email: string;
  profilePic: string | null;
  createdAt?: number;
  updatedAt?: number;
  groupId: string | null;
  currentTaskId: string | null;
};

/** User settings type */
export type UserSettings = {
  color: string;
  tasksVisible: boolean;
  timerVisible: boolean;
  activityVisible: boolean;
};

export const UserSettingsDefaultValues: UserSettings = {
  color: '#010203',
  tasksVisible: true,
  timerVisible: true,
  activityVisible: true,
};

/** Pomodoro settings type */
export type PomodoroSettings = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
  longBreakInterval: number;
};

/** Default values for PomodoroSettings */
export const PomodoroSettingsDefaultValues: PomodoroSettings = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
  autoStartBreak: false,
  autoStartPomodoro: false,
  longBreakInterval: 4,
};

/** Task type */
export type TaskData = {
  id: string;
  title: string;
  description: string;
  pomodorosDone: number;
  pomodorosTotal: number;
  timeSpend: number;
  complete?: boolean;
  completedAt?: number | null;
  createdAt?: number;
  updatedAt?: number;
};

export type UserRecord = {
  timeSpend: number;
  pomodoros: number;
  tasksComplited: number;
  tasksIds: string[];
  tasks: TaskData[];
  updatedAt: number;
};

export const UserRecordDefaultValues: UserRecord = {
  timeSpend: 0,
  pomodoros: 0,
  tasksComplited: 0,
  tasksIds: [],
  tasks: [],
  updatedAt: Date.now(),
};

export type UserWeeklyRecord = {
  dates: number[];
  records: UserRecord[];
  timeSpend: number;
  pomodoros: number;
  tasksComplited: number;
};

export const UserWeeklyRecordDefaultValues: UserWeeklyRecord = {
  dates: [],
  records: [],
  timeSpend: 0,
  pomodoros: 0,
  tasksComplited: 0,
};
