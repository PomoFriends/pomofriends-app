import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import { GroupForm, GroupSettingsForm } from '../utils/types/formTypes';
import {
  GroupAdmin,
  GroupData,
  GroupParticipant,
  GroupSettingsDefaultValues,
  GroupTime,
  KickedUser,
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

        // Create group time doc
        await db
          .collection('groupTime')
          .doc(newGroup.id)
          .set({ time: GroupSettingsDefaultValues.pomodoro });

        // Create kickedUsers doc with the same id as the group
        await db.collection('kickedUsers').doc(newGroup.id).set({});

        // Create first kickedUser
        const firstKickedUser = db
          .collection('kickedUsers')
          .doc(newGroup.id)
          .collection('kickedUsers')
          .doc();

        await firstKickedUser.set({ id: firstKickedUser.id, kicked: true });

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
      const kicked = await db
        .collection('kickedUsers')
        .doc(groupId)
        .collection('kickedUsers')
        .doc(user.id)
        .get()
        .then((res) => {
          if (res.exists) {
            const kickedRef = res.data() as KickedUser;
            if (kickedRef) {
              console.log('you were kicked from the group');
              return kickedRef.kicked;
            }
          }
          return false;
        });

      if (kicked) return;

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

      // Get admin of the group
      const admin: GroupAdmin = await db
        .collection('admins')
        .doc(groupId)
        .get()
        .then((res) => {
          return res.data() as GroupAdmin;
        });

      // Get participants
      const snapshot = await db
        .collection('participants')
        .doc(groupId)
        .collection('participants')
        .get();

      const participants: GroupParticipant[] = snapshot.docs.map(
        (doc) => doc.data() as GroupParticipant
      );

      if (participants.length !== 0) {
        if (admin) {
          // Get a random participant
          const participant =
            participants[Math.floor(Math.random() * participants.length)];
          // set new admin
          await db
            .collection('admins')
            .doc(groupId)
            .set({ userId: participant.id });
        }
      } else {
        // delete group since there is no participants
        await db.collection('groups').doc(groupId).delete();
        await db.collection('groupControls').doc(groupId).delete();
        await db.collection('groupSettings').doc(groupId).delete();
        await db.collection('groupTime').doc(groupId).delete();
        await db.collection('admins').doc(groupId).delete();
        await db.collection('participants').doc(groupId).delete();
        db.collection('messages')
          .doc(groupId)
          .collection('messages')
          .onSnapshot((querySnapshot) => {
            // get all documents from collection with id
            querySnapshot.docs.map((doc) => {
              doc.ref.delete();
            });

            db.collection('messages').doc(groupId).delete();
          });
        db.collection('kickedUsers')
          .doc(groupId)
          .collection('kickedUsers')
          .onSnapshot((querySnapshot) => {
            // get all documents from collection with id
            querySnapshot.docs.map((doc) => {
              doc.ref.delete();
            });

            db.collection('kickedUsers').doc(groupId).delete();
          });
      }

      handleUpdate();
    } else {
      console.log('User is not logged in!');
    }
  };

  const getGroupList = (setGroupList: any, isSubscribed: boolean) => {
    try {
      db.collection('groups')
        .orderBy('createdAt')
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

    if (!isSubscribed) return;

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

  const updateGroupTime = async (groupId: string, time: number) => {
    await db.collection('groupTime').doc(groupId).set({ time });
  };

  const getGroupTime = async (groupId: string, setTime: any) => {
    await db
      .collection('groupTime')
      .doc(groupId)
      .get()
      .then((res) => {
        const timer = res.data() as GroupTime;
        setTime(timer.time);
      });

    console.log('get time');
  };

  return {
    createGroup,
    joinGroup,
    leaveGroup,
    getGroupList,
    getGroupSettings,
    updateGroupSettings,
    groupControl,
    getGroupCommands,
    updateGroupTime,
    getGroupTime,
  };
};
