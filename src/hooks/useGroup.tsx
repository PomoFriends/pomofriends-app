import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import { GroupForm, GroupSettingsForm } from '../utils/types/formTypes';
import {
  GroupAdmin,
  GroupData,
  GroupParticipant,
  GroupSettingsDefaultValues,
} from '../utils/types/groupTypes';
import { useGroupType } from '../utils/types/hookTypes';
import { UserSettings } from '../utils/types/userTypes';
import { useAuth } from './useAuth';

export const useGroup = (): useGroupType => {
  const { user, handleUpdate } = useAuth();
  const router = useRouter();

  const createGroup = async (group: GroupForm) => {
    if (user) {
      try {
        // Create a group doc with randomly generated id
        const newGroup = db.collection('groups').doc();

        const newGroupData: GroupData = {
          id: newGroup.id,
          name: group.name,
          description: group.description,
          participantsCount: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        // Set values to the group
        await newGroup.set(newGroupData);

        // Create group settings doc
        await db
          .collection('groupSettings')
          .doc(newGroup.id)
          .set(GroupSettingsDefaultValues);

        // Create admins doc with the same id as the group
        await db.collection('admins').doc(newGroup.id).set({ userId: user.id });

        // Create group control doc
        await db
          .collection('groupControls')
          .doc(newGroup.id)
          .set({ command: 'resetTimer' });

        // Create participants doc with the same id as the group
        await db.collection('participants').doc(newGroup.id).set({});

        const userColor = await db
          .collection('userSettings')
          .doc(user.id)
          .get()
          .then((response) => {
            const userSettings = response.data() as UserSettings;
            return userSettings.color;
          });

        const participant: GroupParticipant = {
          id: user.id,
          username: user.username,
          profilePic: user.profilePic,
          color: userColor,
          completedTasks: null,
          currentTaskId: user.currentTaskId,
          time: 0,
          pomodoroCount: 0,
          joinedAt: Date.now(),
          pomodoro: false,
          shortBreak: false,
          longBreak: false,
          showTimer: true,
          showTasks: true,
        };

        // add new participant
        await db
          .collection('participants')
          .doc(newGroup.id)
          .collection('participants')
          .doc(user.id)
          .set(participant);

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
          userId: '5wLyG0ZNob0pq4M2sgSXpomoBot',
          username: 'PomoBot',
          color: '#bb86fc',
          message: 'yo',
          createdAt: Date.now(),
        });

        await db
          .collection('users')
          .doc(user.id)
          .update({ groupId: newGroup.id });

        handleUpdate();
      } catch {
        console.log("Something went wrong, couldn't create a group");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const joinGroup = async (groupId: string) => {
    if (user) {
      const userColor = await db
        .collection('userSettings')
        .doc(user.id)
        .get()
        .then((response) => {
          const userSettings = response.data() as UserSettings;
          return userSettings.color;
        });

      const participant: GroupParticipant = {
        id: user.id,
        username: user.username,
        profilePic: user.profilePic,
        color: userColor,
        completedTasks: null,
        currentTaskId: user.currentTaskId,
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

      await db.collection('users').doc(user.id).update({ groupId });

      handleUpdate();
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
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

      await db.collection('users').doc(user.id).update({ groupId: null });

      await db
        .collection('groups')
        .doc(groupId)
        .update({
          participantsCount: firebase.firestore.FieldValue.increment(-1),
        });
      handleUpdate();
    } else {
      console.log('User is not logged in!');
    }
  };

  const getGroupList = (setGroupList: any, isSubscribed: boolean) => {
    try {
      db.collection('groups')
        .orderBy('createdAt')
        .limit(100)
        .onSnapshot((querySnapshot) => {
          // get all documents from collection with id
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          //   update state
          if (isSubscribed) {
            setGroupList(data as GroupData[]);
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

  const getGroupSettings = (
    groupId: string,
    setSettings: any,
    isSubscribed: boolean
  ) => {
    try {
      db.collection('groupSettings')
        .doc(groupId)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.data();

          if (isSubscribed && data) {
            setSettings(data);
          }
        });
    } catch (error) {
      console.log("Couldn't get admin");
    }
  };

  const updateGroupSettings = async (
    groupId: string,
    settings: GroupSettingsForm
  ) => {
    if (!user) {
      console.log('User is not logged in!');
      return;
    }

    const admin = await db
      .collection('admins')
      .doc(groupId)
      .get()
      .then((response) => {
        return response.data() as GroupAdmin;
      });

    if (admin.userId === user.id) {
      // Update group settings
      await db.collection('groupSettings').doc(groupId).update(settings);
    } else {
      console.log('User is not an admin of the group');
      return;
    }
  };

  // Sends command to other participants.
  // List of commands:
  // startPomodoro
  // startShortBreak
  // startLongBreak
  // toggleTimeCounting
  // resetTimer
  // skipCurrent
  // startTimer

  const groupControl = async (groupId: string, command: string) => {
    if (!user) {
      console.log('User is not logged in!');
      return;
    }

    console.log('command', command);

    const admin = await db
      .collection('admins')
      .doc(groupId)
      .get()
      .then((response) => {
        return response.data() as GroupAdmin;
      });

    if (admin.userId === user.id) {
      // Update group settings
      await db.collection('groupControls').doc(groupId).update({ command });
    } else {
      console.log('User is not an admin of the group');
      return;
    }
  };

  const getGroupCommands = (
    groupId: string,
    setCommand: any,
    isSubscribed: boolean
  ) => {
    if (!user) {
      console.log('User is not logged in!');
      return;
    }

    try {
      db.collection('groupControls')
        .doc(groupId)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.data();

          if (isSubscribed && data) {
            setCommand(data.command);
            console.log('recieved command:', data.command);
          }
        });
    } catch (error) {
      console.log("Couldn't get command");
    }
  };

  return {
    createGroup,
    joinGroup,
    leaveGroup,
    getGroupList,
    getAdmin,
    getGroupSettings,
    updateGroupSettings,
    groupControl,
    getGroupCommands,
  };
};
