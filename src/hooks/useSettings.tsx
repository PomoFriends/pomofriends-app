import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import {
  AboutYouSettingsForm,
  VisibilitySettingsForm,
} from '../utils/types/formTypes';
import { useSettingsType } from '../utils/types/hookTypes';
import { PomodoroSettings, UserSettings } from '../utils/types/userTypes';
import { useAuth } from './useAuth';

export const useSettings = (): useSettingsType => {
  const { user, handleUpdate } = useAuth();
  const router = useRouter();

  const updateSettings = async (settings: PomodoroSettings) => {
    if (user) {
      await db.collection('pomodoroSettings').doc(user.id).update(settings);
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const getSettings = (
    userId: string,
    setSettings: any,
    isSubscribed: boolean
  ) => {
    if (!isSubscribed) return;
    try {
      db.collection('pomodoroSettings')
        .doc(userId)
        .onSnapshot((settings) => {
          if (settings.exists) {
            if (isSubscribed) {
              setSettings(settings.data() as PomodoroSettings);
            }
          } else {
            console.log('No such document!');
          }
        });
    } catch (error) {
      console.log("Couldn't get settings");
    }
  };

  const getVisibilitySettings = (
    userId: string,
    setVisibilitySettings: any,
    isSubscribed: boolean
  ) => {
    if (!isSubscribed) return;
    try {
      db.collection('userSettings')
        .doc(userId)
        .onSnapshot((settings) => {
          if (settings.exists) {
            if (isSubscribed) {
              setVisibilitySettings(settings.data() as UserSettings);
            }
          } else {
            console.log('No such document!');
          }
        });
    } catch (error) {
      console.log("Couldn't get settings");
    }
  };

  const updateAboutYou = async (aboutYou: AboutYouSettingsForm) => {
    if (user) {
      await db.collection('users').doc(user.id).update(aboutYou);
      handleUpdate();
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const updateVisibilitySettings = async (settings: VisibilitySettingsForm) => {
    if (user) {
      if (settings.color.length === 7 && settings.color.includes('#'))
        await db.collection('userSettings').doc(user.id).update(settings);
      handleUpdate();
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  return {
    updateSettings,
    getSettings,
    updateAboutYou,
    getVisibilitySettings,
    updateVisibilitySettings,
  };
};
