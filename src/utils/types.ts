import firebase from 'firebase/compat/app';

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

/** User type from firebase */
export type UserData = firebase.User;

/** Type for useAuth */
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
