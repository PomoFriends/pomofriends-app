/** For login form */
export type LoginData = {
  email: string;
  password: string;
};

/** For sign up form */
export type SignUpData = {
  displayName: string;
  email: string;
  password: string;
};

/** Reset password */
export type ResetPasswordData = {
  email: string;
};

/** Error mesage for forms */
export type ErrorMessage = {
  message: string | null;
};

/** User type */
export type UserData = {
  id: string;
  username: string;
  email?: string;
  profilePic?: string | null;
  createdAt?: number;
  updatedAt?: number;
  groupId?: string | null;
};

/** User settings type */
export type UserSettings = {
  color: string;
  tasksVisible: boolean;
  timerVisible: boolean;
  activityVisible: boolean;
};

export const UserSettingsDefaultValues: UserSettings = {
  color: '#000000',
  tasksVisible: true,
  timerVisible: true,
  activityVisible: true,
};

/** Type for useAuth hook */
export type authContextType = {
  user: UserData | null;
  signUp: ({ displayName, email, password }: SignUpData) => Promise<any>;
  signIn: ({ email, password }: LoginData) => Promise<any>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => void;
};

/** Default values for useAuth */
export const authContextDefaultValues: authContextType = {
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  sendPasswordResetEmail: async () => {},
};

/** Type for useGroup hook */
export type useGroupType = {
  // getGroups: () => Promise<GroupData[]>;
  createGroup: ({ name, description }: GroupForm) => Promise<boolean>;
  joinGroup: (groupId: string) => Promise<boolean>;
  leaveGroup: (groupId: string) => Promise<boolean>;
  sendMessage: (chat: ChatForm) => Promise<boolean>;
  getMessages: (groupId: string) => void;
};

/**  For group form */
export type GroupForm = {
  name: string;
  description: string;
};

/** Group type */
export type GroupData = {
  id: string;
  name: string;
  description: string;
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
  name: string;
  tasks: Task[];
  time: number;
  pomodoroCount: number;
  joinedAt: number;
  pomodoro: boolean;
  shortBreak: boolean;
  longBreak: boolean;
  showTimer: boolean;
  showTasks: boolean;
};

/** Pomodoro settings type */
export type PomodoroSettings = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  autoStartPomodoro: boolean;
  longBreakInterval: number;
  notificationsOn: boolean;
};

/** Default values for PomodoroSettings */
export const PomodoroSettingsDefaultValues: PomodoroSettings = {
  pomodoro: 1500,
  shortBreak: 300,
  longBreak: 900,
  autoStartBreak: true,
  autoStartPomodoro: true,
  longBreakInterval: 4,
  notificationsOn: false,
};

/** Task type */
export type Task = {
  id: string;
  title: string;
  description: string;
  pomodoros: number;
  complete?: boolean;
  completedAt?: number;
  createdAt?: number;
  updatedAt?: number;
};

/** Time type */
export type Time = {
  hours?: number;
  minutes?: number;
  seconds: number;
};

/** Message type */
export type GroupMessage = {
  id: string;
  userId: string;
  username: string;
  profilePic?: string | null;
  message: string;
  createdAt?: number;
};

/**  Chat input */
export type ChatForm = {
  groupId: string;
  message: string;
};
