import { db } from '../firebase/firebase';
import { useParticipantsType, GroupParticipant } from '../utils/types';

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

  return {
    getParticipants,
  };
};
