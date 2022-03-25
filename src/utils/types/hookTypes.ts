import {
  AboutYouSettingsForm,
  ChatForm,
  GroupForm,
  SignInData,
  SignUpData,
  TaskForm,
} from './formTypes';
import { GroupMessage } from './groupTypes';
import { PomodoroSettings, UserData } from './userTypes';

/** Type for useAuth hook */
export type authContextType = {
  user: UserData | null;
  signUp: ({ username, email, password }: SignUpData) => Promise<any>;
  signIn: ({ email, password }: SignInData) => Promise<any>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => void;
  handleUpdate: () => void;
};

/** Default values for useAuth */
export const authContextDefaultValues: authContextType = {
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  sendPasswordResetEmail: async () => {},
  handleUpdate: () => {},
};

/** Type for useGroup hook */
export type useGroupType = {
  createGroup: ({ name, description }: GroupForm) => Promise<boolean>;
  joinGroup: (groupId: string) => Promise<boolean>;
  leaveGroup: (groupId: string) => Promise<boolean>;
  getGroupList: (setGroupList: any, isSubscribed: boolean) => void;
  getAdmin: (groupId: string, setAdmin: any, isSubscribed: boolean) => void;
};

/** Type for useSettings hook */
export type useSettingsType = {
  updateSettings: ({}: PomodoroSettings) => Promise<boolean>;
  getSettings: (
    userId: string,
    setSettings: any,
    isSubscribed: boolean
  ) => void;
  updateAboutYou: (aboutYou: AboutYouSettingsForm) => Promise<boolean>;
};

/** Type for useTasks hook */
export type useTasksType = {
  createTask: ({}: TaskForm) => Promise<boolean>;
  editTask: ({}: TaskForm, taskId: string) => Promise<boolean>;
  deleteTask: (taskId: string) => Promise<boolean>;
  setCurrentTask: (taskId: string) => Promise<boolean>;
  completeTask: (taskId: string) => Promise<boolean>;
  uncompleteTask: (taskId: string) => Promise<boolean>;
  addPomodoro: (taskId: string) => Promise<boolean>;
  getTasks: (
    setTaskList: any,
    setCurrentTaskId: any,
    isSubscribed: boolean
  ) => void;
};

/** Type for useGroup hook */
export type useChatType = {
  sendMessage: (chat: ChatForm) => Promise<boolean>;
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
};
