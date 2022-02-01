import firebase from 'firebase/compat/app';

export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  displayName: string;
  email: string;
  password: string;
};

export type ResetPasswordData = {
  email: string;
};

export type UserData = firebase.User;

export type authContextType = {
  user: UserData | null;
  signUp: ({ displayName, email, password }: SignUpData) => Promise<any>;
  signIn: ({ email, password }: LoginData) => Promise<any>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => void;
};

export const authContextDefaultValues: authContextType = {
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  sendPasswordResetEmail: async () => {},
};
