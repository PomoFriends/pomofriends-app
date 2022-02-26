import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from '../firebase/firebase';
import {
  authContextDefaultValues,
  authContextType,
  PomodoroSettingsDefaultValues,
  SignInData,
  SignUpData,
  UserData,
  UserSettingsDefaultValues,
} from '../utils/types';
import React from 'react';

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
  const [update, setUpdate] = useState(0);

  /**
   *
   * @param {UserData} user
   * @return {Promise<any>} user or error
   *
   * Function that creates a doc for the user in database.
   */
  const createUser = async (user: UserData): Promise<any> => {
    console.log('createUser', user);
    const newUser = await db
      .collection('users')
      .doc(user.id)
      .set(user)
      .then(() => {
        // Change the state of the user
        setUser(user);
        // console.log('User:', user);
        return user;
      });

    if (newUser) {
      // Create settings, tasks, and pomodoroSettings docs with the same id as user
      db.collection('userSettings')
        .doc(newUser.id)
        .set(UserSettingsDefaultValues);
      db.collection('tasks').doc(newUser.id).set({});
      db.collection('pomodoroSettings')
        .doc(newUser.id)
        .set(PomodoroSettingsDefaultValues);
    } else {
      return { error: 'Something went wrong!' };
    }

    return newUser;
  };

  /**
   *
   * @param {UserData} user
   * @return {Promise<void>} return user or change the state of the user
   *
   * Returns user data from the firestore db.
   */
  const getUserAdditionalData = async (user: UserData): Promise<void> => {
    return await db
      .collection('users')
      .doc(user?.id)
      .get()
      .then((userData) => {
        if (userData.data()) {
          // Change the state of the user
          // console.log(userData.data());
          setUser(userData.data() as any);
        } else {
          // Create user if they do not have the doc in db
          createUser({
            id: user!.id,
            username: user!.username,
            email: user!.email,
            profilePic: user!.profilePic,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            groupId: null,
          });
        }
      });
  };

  /**
   *
   * @param {SignUpData} { username, email, password }
   * @return {Promise<any>} user or error
   *
   * Sign up the user and create a doc for the user.
   *
   */
  const signUp = async ({
    username,
    email,
    password,
  }: SignUpData): Promise<any> => {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser?.sendEmailVerification();
        if (response.user)
          return createUser({
            id: response.user.uid,
            username: username,
            email: email,
            profilePic: `https://avatars.dicebear.com/api/jdenticon/${response.user.uid}.svg`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            groupId: null,
          });
      })
      .catch((error) => {
        return { error };
      });
  };

  /**
   *
   * @param {SignInData} { email, password }
   * @return {Promise<any>} user or error
   *
   * Sign in the user and get additional data of the user.
   *
   */
  const signIn = async ({ email, password }: SignInData): Promise<any> => {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const userResponse = response.user;

        // Change the state of the user
        const userData: UserData = {
          id: userResponse!.uid,
          username: userResponse!.displayName!,
          email: userResponse!.email!,
          profilePic: userResponse!.photoURL!,
          groupId: null,
        };

        // setUser(userData);
        await getUserAdditionalData(userData);
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
   * @param {UserData} user
   * @return {Promise<void>}
   *
   * Keeps user logged in.
   * When user re-enters the application, we need to fetch additional data again.
   *
   */
  const handleAuthStateChanged = async (
    user: UserData | null
  ): Promise<void> => {
    // console.log('handleAuthStateChanged', user);
    // Change the state of the user
    // setUser(user);
    if (user) {
      await getUserAdditionalData(user);
    }
  };

  /**
   *  Observer for changes to the user's sign-in state
   */
  useEffect(() => {
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
        };

        handleAuthStateChanged(userData);
      }
    });

    return () => unsub();
  }, []);

  /**
   * Makes sure that whenever the user’s document is updated,
   * we also update the user state in our application.
   */
  useEffect(() => {
    console.log('update');
    if (user?.id) {
      // Subscribe to user document on mount

      const unsubscribe = db
        .collection('users')
        .doc(user.id)
        .onSnapshot((doc) => setUser(doc.data() as any));
      return () => unsubscribe();
    }
  }, [update]);

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    setUpdate,
  };
};
