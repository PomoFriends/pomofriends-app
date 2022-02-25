import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import {
  ChatForm,
  GroupData,
  GroupForm,
  GroupMessage,
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
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        // Create admins doc with the same id as the group
        await db.collection('admins').doc(newGroup.id).set({ userId: user.id });

        // Create participants doc with the same id as the group
        await db.collection('participants').doc(newGroup.id).set({});

        // add new participant
        await db
          .collection('participants')
          .doc(newGroup.id)
          .collection('participants')
          .doc(user.id)
          .set({
            id: user.id,
            name: user.username,
            tasks: [],
            time: 0,
            pomodoroCount: 0,
            joinedAt: Date.now(),
            pomodoro: false,
            shortBreak: false,
            longBreak: false,
            showTimer: true,
            showTasks: true,
          });

        // Add one to participantsCount
        await db
          .collection('groups')
          .doc(newGroup.id)
          .update({
            participantsCount: firebase.firestore.FieldValue.increment(1),
          });

        // Create messages doc with the same id as the group
        await db.collection('messages').doc(newGroup.id).set({});

        // add first message
        const firstMessage = db
          .collection('messages')
          .doc(newGroup.id)
          .collection('messages')
          .doc();

        await firstMessage.set({
          id: firstMessage.id,
          userId: firstMessage.id,
          username: 'PomoBot',
          profilePic: `https://avatars.dicebear.com/api/jdenticon/${firstMessage.id}.svg`,
          message: 'yo',
          createdAt: Date.now(),
        });

        await router.push(`/group/${newGroup.id}`);

        return true;
      } catch {
        return false;
      }
    } else {
      // Will make a pop up
      router.push('/sign-in');
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
        joinedAt: Date.now(),
        pomodoro: false,
        shortBreak: false,
        longBreak: false,
        showTimer: true,
        showTasks: true,
      };

      const newParticipant = db
        .collection('participants')
        .doc(groupId)
        .collection('participants')
        .doc(user.id);

      await newParticipant.set(participant);

      // Add one to participantsCount
      await db
        .collection('groups')
        .doc(groupId)
        .update({
          participantsCount: firebase.firestore.FieldValue.increment(1),
        });

      // await db
      //   .collection('participants')
      //   .doc(groupId)
      //   .collection('participants')
      //   .doc(user.id)
      //   .add(participant);

      await db.collection('users').doc(user.id).update({ groupId });

      return true;
    } else {
      // Will make a pop up
      await router.push('/sign-in');
      return false;
    }
  };

  const leaveGroup = async (groupId: string) => {
    if (user) {
      await db
        .collection('participants')
        .doc(groupId)
        .collection('participants')
        .doc(user.id)
        .delete();
      // .update({
      //   [`${user.id}`]: firebase.firestore.FieldValue.delete(),
      // });

      await db.collection('users').doc(user.id).update({ groupId: null });

      await db
        .collection('groups')
        .doc(groupId)
        .update({
          participantsCount: firebase.firestore.FieldValue.increment(-1),
        });

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

  const sendMessage = async (chat: ChatForm) => {
    if (user) {
      const newMessage = await db
        .collection('messages')
        .doc(chat.groupId)
        .collection('messages')
        .doc();

      const message: GroupMessage = {
        id: newMessage.id,
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
        message: chat.message,
        createdAt: Date.now(),
      };

      await newMessage.set(message);

      return true;
    } else {
      // Will make a pop up
      await router.push('/sign-in');
      return false;
    }
  };

  const getMessages = (groupId: string) => {
    // return await db.collection('messages').doc(groupId).get();
    return db
      .collection('messages')
      .doc(groupId)
      .collection('messages')
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot((querySnapShot) => {
        // get all documents from collection with id
        const data = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
        }));

        //   update state
        // console.log(data);
        return data;
      });
  };

  return {
    createGroup,
    joinGroup,
    leaveGroup,
    sendMessage,
    getMessages,
  };
};
