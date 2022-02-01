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

export const AuthProvider = (props: { children: ReactNode }): JSX.Element => {
  const auth = useAuthProvider();
  // console.log('useAuthProviderrrrr', auth.user);
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates an auth object and handles it's state
export const useAuthProvider = () => {
  const [user, setUser] = useState<UserData | null>(null);

  const createUser = async (user: any) => {
    return await db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
        console.log('User:', user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const getUserAdditionalData = async (user: any) => {
    return await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          // console.log('UserData:', userData.data());
          setUser(userData.data() as any);
        }
      });
  };

  const signUp = async ({ displayName, email, password }: SignUpData) => {
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

  const signIn = async ({ email, password }: LoginData) => {
    return await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const userResponse = response.user;
        setUser(userResponse);
        // console.log('response user:', userResponse);
        await getUserAdditionalData(user);
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signOut = async () => {
    return await auth.signOut().then(() => setUser(null));
  };

  const sendPasswordResetEmail = async (email: string) => {
    return await auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  // TO-DO: Create user after google and github login
  const handleAuthStateChanged = async (user: UserData | null) => {
    console.log('handleAuthStateChanged', user);
    setUser(user);
    if (user) {
      await getUserAdditionalData(user);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

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
