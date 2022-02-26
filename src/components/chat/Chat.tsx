import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { GroupMessage } from '../../utils/types';
import DisplayMessages from './Display';
import { makeStyles } from '@mui/styles';
import { Box, List } from '@mui/material';

const useStyles = makeStyles((theme: any) => ({
  messages: {
    overflow: 'auto',
    maxHeight: '36rem',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
      borderRadius: 8,
    },
  },
}));

interface ChatProps {
  groupId: string;
}

const Chat: React.FC<ChatProps> = ({ groupId }) => {
  const classes = useStyles();

  const [messages, setMessages] = useState<GroupMessage[]>([]);

  // automatically check db for new messages
  useEffect(() => {
    let cancel = false;

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
        if (cancel) return;

        setMessages(data as GroupMessage[]);
      });
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <Box className={classes.messages}>
        <List>
          {messages.map((message: GroupMessage) => (
            <div key={message.id}>
              <DisplayMessages message={message} />
            </div>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Chat;
