import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from 'react';
import { auth, db } from '../firebase/firebase';
import {
  authContextDefaultValues,
  authContextType,
  LoginData,
  SignUpData,
  UserData,
} from '../utils/types';

const AuthContext = createContext<authContextType>(authContextDefaultValues);

/**
 *
 * @param {{ children: ReactNode }} props
 * @return {JSX.Element}
 *
 * AuthProvider is a wrapper that provides a way to share
 * values between components without having to explicitly pass a prop
 * through every level of the tree. Or simply a context.
 */
export const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();
  // console.log('useAuthProviderrrrr', auth.user);
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

/**
 *
 * @return {authContextType}
 *
 * Context hook
 */
export const useAuth = (): authContextType => {
  return useContext(AuthContext);
};

/**
 *
 * @return {authContextType}
 *
 * Provider hook that creates an auth object and handles it's state.
 */
export const useAuthProvider = (): authContextType => {
  // Create a state for the user
  const [user, setUser] = useState<UserData | null>(null);

  /**
   *
   * @param {any} user
   * @return {Promise<any>} user or error
   *
   * Function that creates a doc for the user in database.
   */
  const createUser = async (user: any): Promise<any> => {
    return await db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        // Change the state of the user
        setUser(user);
        // console.log('User:', user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  /**
   *
   * @param {any} user
   * @return {Promise<void>} return user or change the state of the user
   *
   * Returns user data from the firestore db.
   */
  const getUserAdditionalData = async (user: any): Promise<void> => {
    console.log('getUserAdditionalData');
    return await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          // Change the state of the user
          setUser(userData.data() as any);
        } else {
          // Create user if they do not have the doc in db
          createUser({
            uid: user?.uid,
            email: user.email,
            displayName: user.displayName,
          });
        }
      });
  };

  /**
   *
   * @param {SignUpData} { displayName, email, password }
   * @return {Promise<any>} user or error
   *
   * Sign up the user and create a doc for the user.
   *
   */
  const signUp = async ({
    displayName,
    email,
    password,
  }: SignUpData): Promise<any> => {
    // console.log(displayName);
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser?.sendEmailVerification();
        return createUser({ uid: response.user?.uid, email, displayName });
      })
      .catch((error) => {
        return { error };
      });
  };

  /**
   *
   * @param {LoginData} { email, password }
   * @return {Promise<any>} user or error
   *
   * Sign in the user and get additional data of the user.
   *
   */
  const signIn = async ({ email, password }: LoginData): Promise<any> => {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const userResponse = response.user;
        // Change the state of the user
        setUser(userResponse);
        // console.log('response user:', userResponse);
        await getUserAdditionalData(user);
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  /**
   *
   * @return {Promise<void>}
   *
   * Sign out the user.
   * Change the state of the user to null.
   *
   */
  const signOut = async (): Promise<void> => {
    // Change the state of the user
    return await auth.signOut().then(() => setUser(null));
  };

  /**
   *
   * @param {string} email
   * @return {Promise<void>}
   *
   * Send password reset email.
   *
   */
  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    return await auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  /**
   *
   * @param {UserData | null} user
   * @return {Promise<void>}
   *
   * Keeps user logged in.
   * When user re-enters the application, we need to fetch additional data again.
   *
   */
  const handleAuthStateChanged = async (
    user: UserData | null
  ): Promise<void> => {
    console.log('handleAuthStateChanged', user);
    // Change the state of the user
    setUser(user);
    if (user) {
      await getUserAdditionalData(user);
    }
  };

  /**
   *  Observer for changes to the user's sign-in state
   */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  /**
   * Makes sure that whenever the user’s document is updated,
   * we also update the user state in our application.
   */
  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data() as any));
      return () => unsubscribe();
    }
  }, []);

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
  };
};
