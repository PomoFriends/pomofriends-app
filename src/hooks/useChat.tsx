import { useRouter } from 'next/router';
import { db } from '../firebase/firebase';
import { ChatForm } from '../utils/types/formTypes';
import { GroupMessage } from '../utils/types/groupTypes';
import { useChatType } from '../utils/types/hookTypes';
import { UserSettings } from '../utils/types/userTypes';
import { useAuth } from './useAuth';

export const useChat = (): useChatType => {
  const { user } = useAuth();
  const router = useRouter();

  const sendMessage = async (chat: ChatForm) => {
    if (chat.message.length === 0) {
      return;
    }
    if (user) {
      try {
        const userColor = await db
          .collection('userSettings')
          .doc(user.id)
          .get()
          .then((response) => {
            const userSettings = response.data() as UserSettings;
            return userSettings.color;
          });

        const newMessage = db
          .collection('messages')
          .doc(chat.groupId)
          .collection('messages')
          .doc();

        const message: GroupMessage = {
          id: newMessage.id,
          userId: user.id,
          username: user.username,
          color: userColor,
          message: chat.message,
          createdAt: Date.now(),
        };

        await newMessage.set(message);
      } catch (error) {
        console.log("Couldn't send a message");
      }
    } else {
      console.log('User is not logged in!');
      await router.push('/sign-in');
    }
  };

  const deleteMessage = async (message: GroupMessage, groupId: string) => {
    if (user) {
      if (user.id === message.userId) {
        try {
          await db
            .collection('messages')
            .doc(groupId)
            .collection('messages')
            .doc(message.id)
            .delete();
        } catch (error) {
          console.log("Couldn't delete a message");
        }
      }
    }
  };

  const getMessages = (
    groupId: string,
    setMessages: any,
    isSubscribed: boolean
  ) => {
    try {
      db.collection('messages')
        .doc(groupId)
        .collection('messages')
        .orderBy('createdAt')
        .limit(100)
        .onSnapshot((querySnapShot) => {
          const data = querySnapShot.docs.map((doc) => ({
            ...doc.data(),
          }));
          if (isSubscribed) {
            setMessages(data as GroupMessage[]);
          }
        });
    } catch (error) {
      console.log("Couldn't get messages");
    }
  };

  return {
    sendMessage,
    deleteMessage,
    getMessages,
  };
};
