/** Sing in form */
export type SignInData = {
  email: string;
  password: string;
};

/** Sign up form */
export type SignUpData = {
  username: string;
  email: string;
  password: string;
};

/** Reset password form*/
export type ResetPasswordData = {
  email: string;
};

/** Error mesage for forms */
export type ErrorMessage = {
  message: string | null;
};

/** About you settings form */
export type AboutYouSettingsForm = {
  username: string;
};

/** Group form */
export type GroupForm = {
  name: string;
  description: string;
};

/** Pomodoro settings form */
export type PomodoroSettingsForm = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
  longBreakInterval: number;
  notificationsOn: boolean;
};

/** Pomodoro settings form */
export type VisibilitySettingsForm = {
  color: string;
  tasksVisible: boolean;
  activityVisible: boolean;
};

/** Group settings form */
export type GroupSettingsForm = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
  longBreakInterval: number;
};

/** Task form */
export type TaskForm = {
  title: string;
  description: string;
  pomodorosTotal: number;
};

/** Chat form */
export type ChatForm = {
  groupId: string;
  message: string;
};
