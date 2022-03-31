import { db } from '../firebase/firebase';
import { GroupParticipant } from '../utils/types/groupTypes';
import { useParticipantsType } from '../utils/types/hookTypes';

export const useParticipants = (): useParticipantsType => {
  const getParticipants = (
    groupId: string,
    setParticipants: any,
    isSubscribed: boolean
  ) => {
    try {
      db.collection('participants')
        .doc(groupId)
        .collection('participants')
        .orderBy('username')
        .onSnapshot((querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => ({
            ...doc.data(),
          }));
          if (isSubscribed) {
            setParticipants(data as GroupParticipant[]);
          }
        });
    } catch (error) {
      console.log("Couldn't get messages");
    }
  };

  const getAdmin = (groupId: string, setAdmin: any, isSubscribed: boolean) => {
    try {
      db.collection('admins')
        .doc(groupId)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.data();

          if (isSubscribed && data) {
            setAdmin(data?.userId);
          }
        });
    } catch (error) {
      console.log("Couldn't get admin");
    }
  };

  const changeAdmin = async (groupId: string, userId: string) => {
    try {
      await db.collection('admins').doc(groupId).set({ userId: userId });
      console.log('make admin');
    } catch (error) {
      console.log("Couldn't set admin");
    }
  };

  return {
    getParticipants,
    getAdmin,
    changeAdmin,
  };
};
