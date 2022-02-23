import { ErrorMessage } from './types';

/**
 *
 * @param {any} errorResponse
 * @return {ErrorMessage | null}
 *
 * Gets an error message by firebase for signup and signin forms,
 * transfroms it into a better message and then returns it
 */
export const getErrorMessage = (errorResponse: any): ErrorMessage | null => {
  let error: ErrorMessage | null = null;

  // 'uid' error is due to a weird bug, that doesn't fetch user.uid from
  // the db for the first time but it still signs in the user.
  // Therefore this error can be ignored.
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
