import { db } from '../firebase/firebase';
import { GroupParticipant } from '../utils/types/groupTypes';
import { useParticipantsType } from '../utils/types/hookTypes';
import firebase from 'firebase/compat/app';
import { useAuth } from './useAuth';

export const useParticipants = (): useParticipantsType => {
  const { user } = useAuth();
  const FieldValue = firebase.firestore.FieldValue;

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

  const kickUser = async (groupId: string, userId: string) => {
    try {
      await db
        .collection('participants')
        .doc(groupId)
        .collection('participants')
        .doc(userId)
        .delete();

      await db.collection('users').doc(userId).update({ groupId: null });

      await db
        .collection('groups')
        .doc(groupId)
        .update({
          participantsCount: FieldValue.increment(-1),
        });

      await db
        .collection('kickedUsers')
        .doc(groupId)
        .collection('kickedUsers')
        .doc(userId)
        .set({ id: userId, kicked: true });
    } catch (error) {
      console.log("Couldn't kick user");
    }
  };

  const muteUser = async (userId: string) => {
    if (user) {
      try {
        await db
          .collection('mutedUsers')
          .doc(user.id)
          .update({
            mutedUserIds: FieldValue.arrayUnion(userId),
          });
      } catch (error) {
        console.log("Couldn't mute user");
      }
    }
  };

  const unmuteUser = async (userId: string) => {
    if (user) {
      try {
        await db
          .collection('mutedUsers')
          .doc(user.id)
          .update({
            mutedUserIds: FieldValue.arrayRemove(userId),
          });
      } catch (error) {
        console.log("Couldn't unmunte user");
      }
    }
  };

  const getMutedUser = (setMuted: any, isSubscribed: boolean) => {
    if (user) {
      try {
        db.collection('mutedUsers')
          .doc(user.id)
          .onSnapshot((querySnapshot) => {
            const data = querySnapshot.data();

            if (isSubscribed && data) {
              setMuted(data.mutedUserIds);
            }
          });
      } catch (error) {
        console.log("Couldn't get admin");
      }
    }
  };

  return {
    getParticipants,
    getAdmin,
    changeAdmin,
    kickUser,
    muteUser,
    unmuteUser,
    getMutedUser,
  };
};
