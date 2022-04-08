import {
  AboutYouSettingsForm,
  ChatForm,
  GroupForm,
  GroupSettingsForm,
  SignInData,
  SignUpData,
  TaskForm,
  VisibilitySettingsForm,
} from './formTypes';
import { GroupMessage } from './groupTypes';
import { PomodoroSettings, UserData } from './userTypes';

/** Type for useAuth hook */
export type authContextType = {
  user: UserData | null;
  userLoading: boolean;
  signUp: ({ username, email, password }: SignUpData) => Promise<any>;
  signIn: ({ email, password }: SignInData) => Promise<any>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => void;
  handleUpdate: () => void;
  updateTimeSpend: (time: number) => Promise<void>;
  updatePomodoro: () => Promise<void>;
};

/** Default values for useAuth */
export const authContextDefaultValues: authContextType = {
  user: null,
  userLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  sendPasswordResetEmail: async () => {},
  handleUpdate: () => {},
  updateTimeSpend: async () => {},
  updatePomodoro: async () => {},
};

/** Type for useGroup hook */
export type useGroupType = {
  createGroup: ({ name, description }: GroupForm) => Promise<void>;
  joinGroup: (groupId: string) => Promise<void>;
  leaveGroup: (groupId: string) => Promise<void>;
  getGroupList: (setGroupList: any, isSubscribed: boolean) => void;
  getGroupSettings: (
    groupId: string,
    setGroupSettings: any,
    isSubscribed: boolean
  ) => void;
  updateGroupSettings: (
    groupId: string,
    settings: GroupSettingsForm
  ) => Promise<void>;
  groupControl: (groupId: string, command: string) => Promise<void>;
  getGroupCommands: (
    groupId: string,
    setCommand: any,
    isSubscribed: boolean
  ) => void;
  updateGroupTime: (groupId: string, time: number) => Promise<void>;
  getGroupTime: (groupId: string, setTime: any) => Promise<void>;
};

/** Type for useSettings hook */
export type useSettingsType = {
  updateSettings: ({}: PomodoroSettings) => Promise<void>;
  getSettings: (
    userId: string,
    setSettings: any,
    isSubscribed: boolean
  ) => void;
  updateAboutYou: (aboutYou: AboutYouSettingsForm) => Promise<void>;
  getVisibilitySettings: (
    userId: string,
    setVisibilitySettings: any,
    isSubscribed: boolean
  ) => void;
  updateVisibilitySettings: (settings: VisibilitySettingsForm) => Promise<void>;
};

/** Type for useTasks hook */
export type useTasksType = {
  createTask: ({}: TaskForm) => Promise<void>;
  editTask: ({}: TaskForm, taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  setCurrentTask: (taskId: string) => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  uncompleteTask: (taskId: string) => Promise<void>;
  addPomodoro: () => Promise<void>;
  updateTaskTime: (time: number) => Promise<void>;
  getTasks: (
    setTaskList: any,
    setCurrentTaskId: any,
    isSubscribed: boolean
  ) => void;
};

/** Type for useGroup hook */
export type useChatType = {
  sendMessage: (chat: ChatForm) => Promise<void>;
  deleteMessage: (message: GroupMessage, groupId: string) => Promise<void>;
  getMessages: (
    groupId: string,
    setMessages: any,
    isSubscribed: boolean
  ) => void;
};

/** Type for useParticipants hook */
export type useParticipantsType = {
  getParticipants: (
    groupId: string,
    setParticipants: any,
    isSubscribed: boolean
  ) => void;
  getAdmin: (groupId: string, setAdmin: any, isSubscribed: boolean) => void;
  changeAdmin: (groupId: string, userId: string) => Promise<void>;
  kickUser: (groupId: string, userId: string) => Promise<void>;
  muteUser: (userId: string) => Promise<void>;
  unmuteUser: (userId: string) => Promise<void>;
  getMutedUser: (setMuted: any, isSubscribed: boolean) => void;
  reportUser: (userId: string, reason: string) => Promise<void>;
};
