import firebase from 'firebase/compat/app';
import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import {
  GroupData,
  GroupForm,
  GroupParticipant,
  useGroupType,
} from '../utils/types';
import { useAuth } from './useAuth';

export const useGroup = (): useGroupType => {
  const { user } = useAuth();
  const router = useRouter();

  /**
   *
   * @param {GroupForm} group
   * @return {Promise<GroupData | any>}
   *
   * Creates group
   * Creates new 'admins' doc with the same is as the group
   * Creates new 'participants' doc with the same is as the group
   * Creates new 'messages' doc with the same is as the group
   *
   */
  const createGroup = async (group: GroupForm): Promise<GroupData | any> => {
    if (user) {
      try {
        // Create a group doc with randomly generated id
        const newGroup = db.collection('groups').doc();

        // Set values to the group
        await newGroup.set({
          id: newGroup.id,
          name: group.name,
          description: group.description,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        // Create admins doc with the same id as the group
        await db.collection('admins').doc(newGroup.id).set({ userId: user.id });

        // Create participants doc with the same id as the group
        await db.collection('participants').doc(newGroup.id).set({});

        // Create messages doc with the same id as the group
        await db.collection('messages').doc(newGroup.id).set({});

        return true;
      } catch {
        return false;
      }
    } else {
      // Will make a pop up
      router.push('/login');
    }
  };

  const joinGroup = async (groupId: string) => {
    if (user) {
      const participant: GroupParticipant = {
        id: user.id,
        name: user.username,
        tasks: [],
        time: 0,
        pomodoroCount: 0,
        joinedAt: serverTimestamp(),
        pomodoro: false,
        shortBreak: false,
        longBreak: false,
        showTimer: true,
        showTasks: true,
      };

      await db
        .collection('participants')
        .doc(groupId)
        .update({ [`${user.id}`]: participant });

      await db.collection('users').doc(user.id).update({ groupId });

      return true;
    } else {
      // Will make a pop up
      router.push('/login');
      return false;
    }
  };

  const leaveGroup = async (groupId: string) => {
    if (user) {
      await db
        .collection('participants')
        .doc(groupId)
        .update({
          [`${user.id}`]: firebase.firestore.FieldValue.delete(),
        });

      await db.collection('users').doc(user.id).update({ groupId: null });
      router.push('/group');
      return true;
    } else {
      // Will make a pop up

      return false;
    }
  };

  // const getAdmin = async (groupId: string) => {

  // }

  // const deleteGroup = () => {};

  return {
    createGroup,
    joinGroup,
    leaveGroup,
  };
};
