import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { authContextType } from '../utils/types/hookTypes';
import { UserData } from '../utils/types/userTypes';
import { useAuth } from './useAuth';

/**
 *
 * @return {authContextType}
 *
 * For pages where user must be authentificated.
 * Returns values from the useAuth (user, signUp, signIn, signOut)
 * if user is logged in. Otherwise redirect user to the sign in page.
 */
export const useRequireAuth = (): authContextType => {
  const contexAuth = useAuth();
  const router = useRouter();

  // Redirect user to the sign in page if they are not logged in
  const handleAuthStateChanged = (user: UserData | null) => {
    if (user === null) {
      console.log('User is not logged in!');
      router.push('/sign-in');
    }
  };

  // Observer for changes to the user's sign-in state
  useEffect(() => {
    // const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    const unsub = auth.onAuthStateChanged((user) => {
      if (user === null) {
        handleAuthStateChanged(user);
      } else {
        const userData: UserData = {
          id: user.uid,
          username: user!.displayName!,
          email: user!.email!,
          profilePic: user!.photoURL!,
          groupId: null,
          currentTaskId: null,
        };

        handleAuthStateChanged(userData);
      }
    });

    return () => unsub();
  }, []);

  return contexAuth;
};
