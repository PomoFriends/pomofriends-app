import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { UserData } from '../utils/types';
import { useAuth } from './useAuth';

export const useRequireAuth = () => {
  const contexAuth = useAuth();
  const router = useRouter();

  //   console.log('useRequireAuth', contexAuth);

  const handleAuthStateChanged = (user: UserData | null) => {
    if (user === null) {
      router.push('/login');
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsub();
  }, []);

  return contexAuth;
};
