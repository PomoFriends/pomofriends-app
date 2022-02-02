import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { authContextType, UserData } from '../utils/types';
import { useAuth } from './useAuth';

/**
 *
 * @return {authContextType}
 *
 * For pages where user must be authentificated.
 * Returns values from the useAuth (user, signUp, signIn, signOut)
 * if user is logged in. Otherwise redirect user to the login page.
 */
export const useRequireAuth = (): authContextType => {
  const contexAuth = useAuth();
  const router = useRouter();

  // console.log('useRequireAuth', contexAuth);

  // Redirect user to the login page if they are not logged in
  const handleAuthStateChanged = (user: UserData | null) => {
    if (user === null) {
      router.push('/login');
    }
  };

  // Observer for changes to the user's sign-in state
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsub();
  }, []);

  return contexAuth;
};
