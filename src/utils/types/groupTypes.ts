import { TaskData } from './userTypes';

/** Group type */
export type GroupData = {
  id: string;
  name: string;
  description: string;
  participantsCount: number;
  createdAt?: number;
  updatedAt?: number;
};

/** Group admin Type */
export type GroupAdmin = {
  userId: string;
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
