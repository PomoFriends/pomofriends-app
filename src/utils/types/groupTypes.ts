import { TaskData } from './userTypes';

/** Group type */
export type GroupData = {
  id: string;
  name: string;
  description: string;
  participantsCount: number;
  createdAt: number;
  updatedAt: number;
};

export type GroupSettings = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
  longBreakInterval: number;
};

export const GroupSettingsDefaultValues = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
  autoStartBreak: true,
  autoStartPomodoro: true,
  longBreakInterval: 4,
};

/** Group admin Type */
export type GroupAdmin = {
  userId: string;
};

export type GroupCommand = {
  command: string;
};

/** Participant of the group type */
export type GroupParticipant = {
  id: string;
  username: string;
  profilePic: string | null;
  color: string;
  completedTasks: TaskData[] | null;
  currentTaskId: string | null;
  time: number;
  pomodoroCount: number;
  joinedAt: number;
  pomodoro: boolean;
  shortBreak: boolean;
  longBreak: boolean;
  showTimer: boolean;
  showTasks: boolean;
};

/** Message type */
export type GroupMessage = {
  id: string;
  userId: string;
  message: string;
  username: string;
  color: string;
  createdAt: number;
};

export type GroupTime = {
  time: number;
};

export type KickedUser = {
  kicked: boolean;
};
