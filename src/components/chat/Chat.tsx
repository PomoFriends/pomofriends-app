import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { GroupMessage } from '../../utils/types';
import DisplayMessages from './DisplayMessages';
import ChatForm from './Form';

interface ChatProps {
  groupId: string;
}

const Chat: React.FC<ChatProps> = ({ groupId }) => {
  // // initial states
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  // const [newMessage, setNewMessage] = useState('');

  // // automatically check db for new messages
  useEffect(() => {
    db.collection('messages')
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
        console.log(data);
        setMessages(data as GroupMessage[]);
      });
  }, [db]);

  return (
    <>
      <DisplayMessages messages={messages} />
      <ChatForm groupId={groupId} />
    </>
  );
};

export default Chat;
