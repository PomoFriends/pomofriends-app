import { ErrorMessage } from './types';

export const getErrorMessage = (errorResponse: any) => {
  let error: ErrorMessage | null = null;

  if (errorResponse?.message?.includes('uid')) {
    console.log(errorResponse?.message);
    error = { message: null };
  }

  if (
    errorResponse?.message?.includes('auth/wrong-password') ||
    errorResponse?.message?.includes('auth/user-not-found')
  ) {
    error = {
      message: 'The email address or password are incorrect, please try again.',
    };
  }

  if (errorResponse?.message?.includes('auth/email-already-in-use')) {
    error = { message: 'The email address is already in use.' };
  }

  return error;
};
