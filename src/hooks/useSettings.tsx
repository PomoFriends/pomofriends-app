import { db } from '../firebase/firebase';
import { AboutYouSettingsForm } from '../utils/types/formTypes';
import { useSettingsType } from '../utils/types/hookTypes';
import { PomodoroSettings } from '../utils/types/userTypes';
import { useAuth } from './useAuth';

export const useSettings = (): useSettingsType => {
  const { user, handleUpdate } = useAuth();

  const updateSettings = async (settings: PomodoroSettings) => {
    if (user) {
      await db.collection('pomodoroSettings').doc(user.id).update(settings);
      return true;
    }
    return false;
  };

  const getSettings = (
    userId: string,
    setSettings: any,
    isSubscribed: boolean
  ) => {
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
      console.log("Couldn't get messages");
    }
  };

  const updateAboutYou = async (aboutYou: AboutYouSettingsForm) => {
    if (user) {
      await db.collection('users').doc(user.id).update(aboutYou);
      handleUpdate();
      return true;
    }
    return false;
  };

  return { updateSettings, getSettings, updateAboutYou };
};
