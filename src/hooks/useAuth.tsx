import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db, realtimedb } from '../firebase/firebase';
import { SignInData, SignUpData } from '../utils/types/formTypes';
import {
  authContextDefaultValues,
  authContextType,
} from '../utils/types/hookTypes';
import {
  NotificationSettingsDefaultValues,
  PomodoroSettingsDefaultValues,
  UserData,
  UserRecordDefaultValues,
  UserSettingsDefaultValues,
  UserWeeklyRecordDefaultValues,
} from '../utils/types/userTypes';
import { useTasks } from './useTasks';

const AuthContext = createContext<authContextType>(authContextDefaultValues);

// AuthProvider is a wrapper that provides a way to share
// values between components without having to explicitly pass a prop
// through every level of the tree. Or simply a context.
export const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();
  // console.log('useAuthProviderrrrr', auth.user);
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

// Context hook
export const useAuth = (): authContextType => {
  return useContext(AuthContext);
};

// Provider hook that creates an auth object and handles it's state.
export const useAuthProvider = (): authContextType => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [userLoading, setLoading] = useState<boolean>(true);
  const [update, setUpdate] = useState(0);

  const FieldValue = firebase.firestore.FieldValue;

  const { updateTaskTime, addPomodoro } = useTasks();

  // Update state of the user
  const handleUpdate = () => {
    setUpdate(+1);
  };

  // Update state of users connection in db
  const onConnect = (uid: string) => {
    const userStatusDatabaseRef = realtimedb.ref('/status/' + uid);
    const userStatusFirestoreRef = firebase.firestore().doc('/status/' + uid);

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnlineForDatabase = {
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const isOfflineForFirestore = {
      state: 'offline',
      last_changed: FieldValue.serverTimestamp(),
    };
    const isOnlineForFirestore = {
      state: 'online',
      last_changed: FieldValue.serverTimestamp(),
    };

    realtimedb.ref('.info/connected').on('value', (snapshot) => {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        userStatusFirestoreRef.set(isOfflineForFirestore);
        return;
      }

      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect() request

          // We can now safely set ourselves as 'online' knowing that the
          // server will mark us as offline once we lose connection.
          userStatusDatabaseRef.set(isOnlineForDatabase);
          userStatusFirestoreRef.set(isOnlineForFirestore);
        });
    });
  };

  // Function that creates a doc for the user in database.
  const createUser = async (user: UserData) => {
    const newUser = await db
      .collection('users')
      .doc(user.id)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      });

    if (newUser) {
      // Create settings, tasks, and pomodoroSettings docs with the same id as user
      await db
        .collection('userSettings')
        .doc(newUser.id)
        .set(UserSettingsDefaultValues);
      await db.collection('tasks').doc(newUser.id).set({});
      await db
        .collection('mutedUsers')
        .doc(newUser.id)
        .set({ mutedUserIds: [] });
      await db
        .collection('pomodoroSettings')
        .doc(newUser.id)
        .set(PomodoroSettingsDefaultValues);
      await db
        .collection('notificationSettings')
        .doc(newUser.id)
        .set(NotificationSettingsDefaultValues);
      await db
        .collection('dailyRecord')
        .doc(newUser.id)
        .set(UserRecordDefaultValues);
      await db
        .collection('weeklyRecord')
        .doc(newUser.id)
        .set(UserWeeklyRecordDefaultValues);
    } else {
      return { error: 'Something went wrong!' };
    }

    return newUser;
  };

  // Returns user data from the firestore db.
  const getUserAdditionalData = async (user: UserData) => {
    return await db
      .collection('users')
      .doc(user?.id)
      .get()
      .then(async (userData) => {
        if (userData.data()) {
          // Change the state of the user
          const user = userData.data() as UserData;
          onConnect(user.id);
          setUser(user);
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
            currentTaskId: null,
          });
        }
      });
  };

  // Sign up the user and create a doc for the user.
  const signUp = async ({ username, email, password }: SignUpData) => {
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
            currentTaskId: null,
          });
      })
      .catch((error) => {
        return { error };
      });
  };

  // Sign in the user and get additional data of the user.
  const signIn = async ({ email, password }: SignInData) => {
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
          currentTaskId: null,
        };

        // setUser(userData);
        await getUserAdditionalData(userData);
        return userData;
      })
      .catch((error) => {
        return { error };
      });
  };

  // Sign out the user.
  // Change the state of the user to null.
  const signOut = async () => {
    // Change the state of the user
    if (user === null) return;

    return await auth.signOut().then(async () => {
      await realtimedb.ref('/status/' + user.id).set({
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      });
      setUser(null);
      router.push('/');
    });
  };

  // Send password reset email.
  const sendPasswordResetEmail = async (email: string) => {
    return await auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  // Keeps user logged in.
  // When user re-enters the application, we need to fetch additional data again.
  const handleAuthStateChanged = async (user: UserData | null) => {
    if (user) {
      await getUserAdditionalData(user);
    }
    setLoading(false);
  };

  // Observer for changes to the user's sign-in state
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
          currentTaskId: null,
        };
        handleAuthStateChanged(userData);
      }
    });

    return () => unsub();
  }, []);

  // Makes sure that whenever the user’s document is updated,
  // we also update the user state in our application.
  useEffect(() => {
    // console.log('update');
    if (user?.id) {
      // Subscribe to user document on mount

      const unsubscribe = db
        .collection('users')
        .doc(user.id)
        .onSnapshot((doc) => setUser(doc.data() as any));
      return () => unsubscribe();
    }
  }, [update]);

  const updateTimeSpend = async (time: number) => {
    if (user) {
      await db
        .collection('dailyRecord')
        .doc(user.id)
        .update({ timeSpend: FieldValue.increment(time) });
      await db
        .collection('weeklyRecord')
        .doc(user.id)
        .update({ timeSpend: FieldValue.increment(time) });
      await updateTaskTime(time);

      if (user.groupId) {
        await db
          .collection('participants')
          .doc(user.groupId)
          .collection('participants')
          .doc(user.id)
          .update({
            timeSpend: FieldValue.increment(time),
          });
      }
    }
  };

  const updatePomodoro = async () => {
    if (user) {
      await db
        .collection('dailyRecord')
        .doc(user.id)
        .update({ pomodoros: FieldValue.increment(1) });
      await db
        .collection('weeklyRecord')
        .doc(user.id)
        .update({ pomodoros: FieldValue.increment(1) });
      await addPomodoro();

      if (user.groupId) {
        await db
          .collection('participants')
          .doc(user.groupId)
          .collection('participants')
          .doc(user.id)
          .update({
            pomodoros: FieldValue.increment(1),
          });
      }
    }
  };

  return {
    user,
    userLoading,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    handleUpdate,
    updateTimeSpend,
    updatePomodoro,
  };
};
