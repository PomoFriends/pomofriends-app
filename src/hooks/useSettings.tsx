import { db } from '../firebase/firebase';
import { PomodoroSettings, useSettingsType } from '../utils/types';
import { useAuth } from './useAuth';

export const useSettings = (): useSettingsType => {
  const { user } = useAuth();

  const updateSettings = async (settings: PomodoroSettings) => {
    if (user) {
      await db.collection('settings').doc(user.id).update(settings);
      return true;
    }
    return false;
  };

  // const getSettings = async (userId: string) => {
  //   try {
  //     return await db
  //       .collection('pomodoroSettings')
  //       .doc(userId)
  //       .get()
  //       .then((settings) => {
  //         if (settings.exists) {
  //           return settings.data() as PomodoroSettings;
  //         } else {
  //           console.log('No such document!');
  //         }
  //       });
  //   } catch (error) {
  //     console.log("Couldn't get settings");
  //   }
  // };

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

  return { updateSettings, getSettings };
};
